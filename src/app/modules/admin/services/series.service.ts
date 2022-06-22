import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {SeriesSearch} from '../../home/models/series-search.model';
import {FilmFilter} from '@shared/models/film-filter.model';
import {EndPoints} from '@shared/end-points';
import {Series} from '../models/series.model';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  static SEARCH = '/search';
  static PICTURES = '/pictures';

  constructor(private httpService: HttpService) {
  }
  create(series: Series): Observable<Series> {
    return this.httpService
      .post(EndPoints.SERIES, series);
  }
  read(id: number): Observable<Series> {
    return this.httpService
      .get(EndPoints.SERIES + '/' + id);
  }

  search(filmSearch: FilmFilter): Observable<SeriesSearch[]> {
    return this.httpService
      .paramsFrom(filmSearch)
      .get(EndPoints.SERIES + SeriesService.SEARCH);
  }
  pictures(id: number): string {
    return EndPoints.SERIES + SeriesService.PICTURES + '/' + id;
  }
}
