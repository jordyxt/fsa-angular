import {Genre} from '../../admin/models/genre.model';

export interface Series {
  id: number;
  title: string;
  description: string;
  releaseYear: string;
  endingYear: string;
  genreList: string[];
}
