import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {FilmSearch} from '../../home/models/film-search.model';
import {FilmFilter} from '@shared/models/film-filter.model';
import {EndPoints} from '@shared/end-points';
import {Film} from '../models/film.model';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  static SEARCH = '/search';
  static PICTURES = '/pictures';

  constructor(private httpService: HttpService) {
  }

  read(id: number): Observable<Film> {
    return this.httpService
      .get(EndPoints.FILMS + '/' + id);
  }

  create(film: Film): Observable<Film> {
    return this.httpService
      .post(EndPoints.FILMS, film);
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
