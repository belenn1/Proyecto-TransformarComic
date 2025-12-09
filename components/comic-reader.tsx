'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';
import { incrementViews, toggleComicLike, getUserLikes } from '@/lib/storage';

interface ComicReaderProps {
  comic: any;
  onBack: () => void;
}

export default function ComicReader({ comic, onBack }: ComicReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comic.likes);

  const pageImages = comic.pageImages && comic.pageImages.length > 0 
    ? comic.pageImages 
    : Array.from({ length: Math.max(10, comic.pages) }, (_, i) => 
        `/placeholder.svg?height=800&width=400&query=${comic.title}+page+${i + 1}`
      );

  useEffect(() => {
    incrementViews(comic.id);
    const userLikes = getUserLikes();
    setIsLiked(userLikes.includes(comic.id));
  }, [comic.id]);

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage(prev => Math.min(pageImages.length - 1, prev + 1));
  };

  const handleToggleLike = () => {
    const newLiked = toggleComicLike(comic.id);
    setIsLiked(newLiked);
    setLikes(newLiked ? likes + 1 : Math.max(0, likes - 1));
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-linear-to-b from-black to-transparent p-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-purple-400 transition"
        >
          <X className="w-6 h-6" />
          <span className="text-sm">Volver</span>
        </button>

        <div className="flex-1 text-center">
          <h2 className="text-white font-bold truncate px-4">{comic.title}</h2>
          <p className="text-gray-400 text-xs">Página {currentPage + 1} de {pageImages.length}</p>
        </div>

        <button
          onClick={handleToggleLike}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
            isLiked
              ? 'bg-pink-500/20 text-pink-400'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
          <span className="text-sm">{likes}</span>
        </button>
      </div>

      {/* Comic Viewer */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Left Navigation */}
        <button
          onClick={goToPrevious}
          disabled={currentPage === 0}
          className="absolute left-4 z-20 p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        {/* Comic Page */}
        <div className="w-full h-full flex items-center justify-center px-4">
          <img
            src={pageImages[currentPage] || "/placeholder.svg"}
            alt={`Page ${currentPage + 1}`}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              (e.target as any).src = `/placeholder.svg?height=800&width=400&query=${comic.title}+page+${currentPage + 1}`;
            }}
          />
        </div>

        {/* Right Navigation */}
        <button
          onClick={goToNext}
          disabled={currentPage === pageImages.length - 1}
          className="absolute right-4 z-20 p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Footer */}
      <div className="bg-linear-to-t from-black to-transparent p-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="bg-gray-800 rounded-full h-1 mb-3 overflow-hidden">
            <div
              className="bg-linear-to-r from-purple-500 to-pink-500 h-full transition-all"
              style={{ width: `${((currentPage + 1) / pageImages.length) * 100}%` }}
            />
          </div>

          {/* Page Navigation */}
          <div className="flex items-center justify-between text-white text-sm">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 transition"
            >
              Anterior
            </button>

            <input
              type="range"
              min="0"
              max={pageImages.length - 1}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="flex-1 mx-4 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />

            <button
              onClick={goToNext}
              disabled={currentPage === pageImages.length - 1}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 transition"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
