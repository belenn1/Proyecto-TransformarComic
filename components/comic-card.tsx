'use client';

import { Heart, Eye } from 'lucide-react';
import Image from 'next/image';

interface ComicCardProps {
  comic: {
    id: string;
    title: string;
    author: string;
    cover?: string;
    likes: number;
    views: number;
    genre: string;
  };
  onClick: () => void;
}

export default function ComicCard({ comic, onClick }: ComicCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-lg overflow-hidden bg-gray-900 hover:bg-gray-800 transition transform hover:scale-105 hover:shadow-xl"
    >
      {/* Cover Image */}
      <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
        <img
          src={comic.cover || `/placeholder.svg?height=400&width=300&query=${comic.title}+cover`}
          alt={comic.title}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
      </div>

      {/* Info */}
      <div className="p-3 bg-gradient-to-t from-black to-transparent">
        <h3 className="font-bold text-white text-sm truncate group-hover:text-purple-300 transition">
          {comic.title}
        </h3>
        <p className="text-xs text-gray-400 truncate">{comic.author}</p>

        {/* Stats */}
        <div className="flex gap-3 mt-2 text-xs text-gray-300">
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-pink-500" />
            <span>{(comic.likes / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-blue-400" />
            <span>{(comic.views / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
