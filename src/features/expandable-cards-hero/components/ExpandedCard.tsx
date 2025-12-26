import type { Song } from "../types/song.types";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ExpandedCardProps {
  song: Song;
  onClose: () => void;
}

export function ExpandedCard({ song, onClose }: ExpandedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        layoutId={`card-${song.id}`}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          <motion.div
            layoutId={`image-${song.id}`}
            className="relative w-full h-80 overflow-hidden"
          >
            <img
              src={song.imageUrl}
              alt={song.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="py-8 px-4">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <motion.h2
                    layoutId={`title-${song.id}`}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    {song.title}
                  </motion.h2>
                  <motion.p
                    layoutId={`artist-${song.id}`}
                    className="text-xl text-gray-600 dark:text-gray-400"
                  >
                    {song.artist}
                  </motion.p>
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors whitespace-nowrap self-start md:self-center"
                >
                  Play
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {song.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
