import {Genre} from '../../admin/models/genre.model';

export interface Film {
  id?: number;
  title: string;
  description: string;
  releaseDate: string;
  genreList: string[];
  trailer: string;
  poster: string;
}
