'use client';

import { useState, useEffect } from 'react';
import { Upload, ArrowLeft, Eye, Plus, Trash2, Calendar, CheckCircle } from 'lucide-react';
import PDFUploader from './pdf-uploader';
import PublicationScheduler from './publication-scheduler';
import { getAllComics, deleteComic, addComic } from '@/lib/storage';

interface CreatedComic {
  id: string;
  title: string;
  genre: string;
  pages: number;
  uploadDate: string;
  scheduledDate?: string;
  autoPublish: boolean;
  views: number;
  likes: number;
}

export default function CreatorDashboard({ onBack }: { onBack: () => void }) {
  const [comics, setComics] = useState<CreatedComic[]>([]);
  const [showUploader, setShowUploader] = useState(false);
  const [selectedComicId, setSelectedComicId] = useState<string | null>(null);

  useEffect(() => {
    const allComics = getAllComics();
    setComics(allComics as CreatedComic[]);
  }, []);

  const handleComicUpload = (comicData: any) => {
    const newComic = addComic({
      title: comicData.title,
      author: 'Creador',
      genre: comicData.genre,
      pages: comicData.pages,
      uploadDate: new Date().toISOString().split('T')[0],
      autoPublish: false,
      views: 0,
      likes: 0
    });
    setComics([...comics, newComic as CreatedComic]);
    setShowUploader(false);
  };

  const handleDeleteComic = (id: string) => {
    deleteComic(id);
    setComics(comics.filter(c => c.id !== id));
  };

  const handleSchedulePublish = (id: string, date: string, autoPublish: boolean) => {
    setComics(comics.map(c =>
      c.id === id
        ? { ...c, scheduledDate: date, autoPublish }
        : c
    ));
    setSelectedComicId(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 via-black to-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-linear-to-b from-purple-900 to-black border-b border-purple-500/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-800 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Mi Panel de Creador</h1>
              <p className="text-gray-400 text-sm">Gestiona y publica tus cómics</p>
            </div>
          </div>

          <button
            onClick={() => setShowUploader(true)}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Cómic</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {showUploader ? (
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Subir Nuevo Cómic</h2>
            <PDFUploader onUpload={handleComicUpload} />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-linear-to-br from-purple-900/50 to-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Cómics Publicados</p>
                <p className="text-2xl font-bold text-purple-400">{comics.length}</p>
              </div>
              <div className="bg-linear-to-br from-blue-900/50 to-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Visualizaciones Totales</p>
                <p className="text-2xl font-bold text-blue-400">{comics.reduce((sum, c) => sum + c.views, 0)}</p>
              </div>
              <div className="bg-linear-to-br from-pink-900/50 to-pink-900/20 border border-pink-500/30 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Likes Totales</p>
                <p className="text-2xl font-bold text-pink-400">{comics.reduce((sum, c) => sum + c.likes, 0)}</p>
              </div>
            </div>

            {/* Comics List */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Mis Cómics</h2>
              {comics.length > 0 ? (
                comics.map(comic => (
                  <div
                    key={comic.id}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Comic Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-20 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Upload className="w-6 h-6 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white">{comic.title}</h3>
                            <div className="flex gap-4 text-sm text-gray-400 mt-2">
                              <span>Género: {comic.genre}</span>
                              <span>Páginas: {comic.pages}</span>
                              <span>Subido: {comic.uploadDate}</span>
                            </div>
                            {comic.scheduledDate && (
                              <div className="flex items-center gap-2 mt-2 text-sm text-blue-400">
                                <Calendar className="w-4 h-4" />
                                {comic.autoPublish ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    Se publicará automáticamente el {comic.scheduledDate}
                                  </>
                                ) : (
                                  <>Publicación programada para {comic.scheduledDate}</>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center text-right">
                        <div className="text-center">
                          <p className="text-gray-400 text-xs">Visualizaciones</p>
                          <p className="text-xl font-bold text-blue-400">{comic.views}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-xs">Likes</p>
                          <p className="text-xl font-bold text-pink-400">{comic.likes}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setSelectedComicId(comic.id)}
                          className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteComic(comic.id)}
                          className="px-3 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg text-sm transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No tienes cómics aún. ¡Crea uno para empezar!</p>
                </div>
              )}
            </div>

            {/* Publication Scheduler Modal */}
            {selectedComicId && (
              <PublicationScheduler
                comic={comics.find(c => c.id === selectedComicId)!}
                onSchedule={(date, autoPublish) => handleSchedulePublish(selectedComicId, date, autoPublish)}
                onClose={() => setSelectedComicId(null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
