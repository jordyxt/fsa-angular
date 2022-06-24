export interface Film {
  id?: number;
  title: string;
  description: string;
  releaseDate: string;
  genreList: string[];
  trailer: string;
  poster: string;
  rating?: number;
  directorList: string[];
  actorList: string[];
}
