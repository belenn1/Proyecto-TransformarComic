'use client';

import { useEffect, useState, useMemo } from 'react';
import pb from '@/lib/pb';
import { Search, Grid, Plus, Loader } from 'lucide-react';
import ComicCard from './comic-card';
import GenreFilter from './genre-filter';
import { getPublishedComics, searchComics } from '@/lib/storage';

const GENRES = ['All', 'Sci-Fi', 'Fantasy', 'Comedy', 'Drama', 'Horror'];

export default function ComicBrowser({
  onSelectComic,
  onCreatorClick
}: {
  onSelectComic: (comic: any) => void;
  onCreatorClick: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [comics, setComics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  async function fetchComics() {
    try {
      setIsLoading(true);
      // Aquí estamos usando la colección "comics" en PocketBase
      const records = await pb.collection('comics').getFullList({
        filter: selectedGenre === 'All' ? '' : `genre = "${selectedGenre}"`,
        sort: '-created', // Si deseas ordenar por fecha de creación, por ejemplo
      });

      setComics(records);
    } catch (error) {
      console.error('Error al obtener cómics:', error);
    } finally {
      setIsLoading(false);
    }
  }

  fetchComics();
}, [selectedGenre]);

  const filteredComics = useMemo(() => {
  return comics.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.author?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || c.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });
}, [searchQuery, selectedGenre, comics]);
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-linear-to-b from-purple-900 to-black border-b border-purple-500/20">
        <div className="p-4 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">CV</span>
              </div>
              <h1 className="text-3xl font-bold text-white">ComicVerse</h1>
            </div>
            <button
              onClick={onCreatorClick}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition text-sm font-semibold"
            >
              Panel de Creador
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Busca cómics o autores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-purple-500/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/60 transition"
            />
          </div>

          {/* Genre Filter */}
          <GenreFilter
            genres={GENRES}
            selected={selectedGenre}
            onSelect={setSelectedGenre}
          />
        </div>
      </div>

      {/* Comics Grid */}
      <div className="p-4 max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-8 h-8 text-purple-400 animate-spin mb-4" />
            <p className="text-gray-400">Cargando cómics...</p>
          </div>
        ) : filteredComics.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredComics.map(comic => (
              <ComicCard
                key={comic.id}
                comic={comic}
                onClick={() => onSelectComic(comic)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Grid className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-400 mb-2">No se encontraron cómics</h2>
            <p className="text-gray-500">Intenta buscar con otros términos o selecciona otro género</p>
          </div>
        )}
      </div>
    </div>
  );
}
