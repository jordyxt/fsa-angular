import {Genre} from '../../admin/models/genre.model';

export interface Film {
  id: number;
  title: string;
  description: string;
  date: string;
  genreList: string[];
}
