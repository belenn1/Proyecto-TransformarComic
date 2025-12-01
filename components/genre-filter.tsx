'use client';

export interface GenreFilterProps {
  genres: string[];
  selected: string;
  onSelect: (genre: string) => void;
}

export default function GenreFilter({ genres, selected, onSelect }: GenreFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {genres.map(genre => (
        <button
          key={genre}
          onClick={() => onSelect(genre)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
            selected === genre
              ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
