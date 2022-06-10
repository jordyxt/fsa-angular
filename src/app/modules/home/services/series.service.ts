import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {Series} from '../models/series.model';
import {FilmSearch} from '@shared/models/film-search.model';
import {EndPoints} from '@shared/end-points';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  static SEARCH = '/search';
  static PICTURES = '/pictures';

  constructor(private httpService: HttpService) {
  }

  read(name: string): Observable<Series> {
    return this.httpService
      .get(EndPoints.SERIES + '/' + name);
  }

  search(filmSearch: FilmSearch): Observable<Series[]> {
    return this.httpService
      .paramsFrom(filmSearch)
      .get(EndPoints.SERIES + SeriesService.SEARCH);
  }
  pictures(id: number): string {
    return EndPoints.SERIES + SeriesService.PICTURES + '/' + id;
  }
}
