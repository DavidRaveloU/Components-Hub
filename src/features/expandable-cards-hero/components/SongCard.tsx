import type { Song } from '../types/song.types';
import { motion } from 'framer-motion';

interface SongCardProps {
  song: Song;
  onClick: () => void;
  isPlaceholder?: boolean;
}

export function SongCard({ song, onClick, isPlaceholder = false }: SongCardProps) {
  if (isPlaceholder) {
    return (
      <div className="flex items-center gap-4 p-3 rounded-lg opacity-30">
        <div className="relative w-14 h-14 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md" />
        <div className="flex-1 min-w-0">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-1" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors group"
    >
      <motion.div 
        layoutId={`image-${song.id}`}
        className="relative w-14 h-14 flex-shrink-0"
      >
        <img
          src={song.imageUrl}
          alt={song.title}
          className="w-full h-full object-cover rounded-md"
        />
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <motion.h3 
          layoutId={`title-${song.id}`}
          className="font-semibold text-gray-900 dark:text-white truncate"
        >
          {song.title}
        </motion.h3>
        <motion.p 
          layoutId={`artist-${song.id}`}
          className="text-sm text-gray-600 dark:text-gray-400 truncate"
        >
          {song.artist}
        </motion.p>
      </div>
      
      <button
        className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Play
      </button>
    </div>
  );
}
