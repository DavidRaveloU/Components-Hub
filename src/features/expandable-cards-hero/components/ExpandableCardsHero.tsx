import { useState } from 'react';
import type { Song } from '../types/song.types';
import { SongCard } from './SongCard';
import { ExpandedCard } from './ExpandedCard';
import { useExpandableCard } from '../hooks/useExpandableCard';
import { AnimatePresence, LayoutGroup } from 'framer-motion';

interface ExpandableCardsHeroProps {
  songs: Song[];
}

export function ExpandableCardsHero({ songs }: ExpandableCardsHeroProps) {
  const { selectedId, expand, collapse } = useExpandableCard();
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const handleCardClick = (song: Song) => {
    setCurrentSong(song);
    expand(song.id);
  };

  return (
    <LayoutGroup>
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-2">
          {songs.map((song) => (
            <div key={song.id}>
              {selectedId === song.id ? (
                <SongCard
                  song={song}
                  onClick={() => {}}
                  isPlaceholder={true}
                />
              ) : (
                <SongCard
                  song={song}
                  onClick={() => handleCardClick(song)}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && currentSong && (
            <ExpandedCard
              song={currentSong}
              onClose={collapse}
            />
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
