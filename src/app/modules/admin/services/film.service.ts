import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {FilmSearch} from '../../home/models/film-search.model';
import {FilmFilter} from '@shared/models/film-filter.model';
import {EndPoints} from '@shared/end-points';
import {Genre} from '../models/genre.model';
import {Film} from '../../home/models/film.model';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  static SEARCH = '/search';
  static PICTURES = '/pictures';

  constructor(private httpService: HttpService) {
  }

  read(name: string): Observable<FilmSearch> {
    return this.httpService
      .get(EndPoints.FILMS + '/' + name);
  }

  create(film: Film): Observable<Film> {
    return this.httpService
      .post(EndPoints.GENRES, film);
  }

  search(filmSearch: FilmFilter): Observable<FilmSearch[]> {
     return this.httpService
      .paramsFrom(filmSearch)
      .get(EndPoints.FILMS + FilmService.SEARCH);
  }
  pictures(id: number): string {
    return EndPoints.FILMS + FilmService.PICTURES + '/' + id;
  }
}
