export interface Series {
  id?: number;
  title: string;
  description: string;
  releaseDate: string;
  seasons: number;
  endingDate: string;
  genreList: string[];
  trailer: string;
  poster: string;
  rating?: number;
  directorList: string[];
  actorList: string[];
}
