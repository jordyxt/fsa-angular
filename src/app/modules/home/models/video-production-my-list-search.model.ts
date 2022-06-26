export interface VideoProductionMyListSearch {
  id: number;
  title: string;
  description: string;
  releaseYear: string;
  genreList: string[];
  rating?: number;
  myRating?: number;
  videoProductionType?: string;
}
