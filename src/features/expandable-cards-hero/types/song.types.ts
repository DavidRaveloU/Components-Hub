export interface Song {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  description: string;
}

export interface ExpandableCardsState {
  selectedSong: Song | null;
  isExpanded: boolean;
}
