"use client";

import { useEffect, useState, useMemo } from "react";
import pb from "@/lib/pb";
import { Search, Grid, Plus, Loader } from "lucide-react";
import ComicCard from "./comic-card";
import GenreFilter from "./genre-filter";
import { getPublishedComics, searchComics } from "@/lib/storage";
import { useQuery } from "@tanstack/react-query";

const GENRES = ["All", "Sci-Fi", "Fantasy", "Comedy", "Drama", "Horror"];

export default function ComicBrowser({
  onSelectComic,
  onCreatorClick,
}: {
  onSelectComic: (comic: any) => void;
  onCreatorClick: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const query = useQuery({
    queryKey: ["comics"],
    queryFn: async () => {
      const records = await pb.collection("comics").getFullList({
        filter: selectedGenre === "All" ? "" : `genre = "${selectedGenre}"`,
        sort: "-created",
      });
      return records;
    },
  });
  
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-linear-to-b from-purple-900 to-black border-b border-purple-500/20">
        <div className="p-4 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold">CV</span>
              </div>
              <h1 className="text-3xl font-bold text-white">ComicVerse</h1>
            </div>
            <button
              onClick={onCreatorClick}
              className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition text-sm font-semibold"
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
        {query.isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-8 h-8 text-purple-400 animate-spin mb-4" />
            <p className="text-gray-400">Cargando cómics...</p>
          </div>
        )}
        {query.isFetched && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {query.data?.map((comic) => (
              <ComicCard
                key={comic.id}
                comic={{
                  id: comic.id,
                  title: comic.title,
                  author: comic.author,
                  cover: comic.pageImage,
                  likes: 0,
                  views: 0,
                  genre: comic.genre,
                }}

                
                onClick={() => onSelectComic(comic)}
              />
            ))}
          </div>
        )}
        {query.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Grid className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-400 mb-2">
              No se encontraron cómics
            </h2>
            <p className="text-gray-500">
              Intenta buscar con otros términos o selecciona otro género
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
