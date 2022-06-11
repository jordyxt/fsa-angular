import {Genre} from '../../admin/models/genre.model';

export interface Film {
  id?: number;
  title: string;
  description: string;
  releaseYear: Date;
  genreList: string[];
  trailer: string;
}
