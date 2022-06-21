import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {FilmSearch} from '../../home/models/film-search.model';
import {FilmFilter} from '@shared/models/film-filter.model';
import {EndPoints} from '@shared/end-points';
import {Genre} from '../models/genre.model';
import {Film} from '../models/film.model';
import {Rating} from '../models/rating.model';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  static SEARCH = '/search';
  static PICTURES = '/pictures';

  constructor(private httpService: HttpService) {
  }

  read(id: number): Observable<number> {
    return this.httpService
      .get(EndPoints.RATINGS + '/' + id);
  }

  create(rating: Rating): Observable<number> {
    return this.httpService
      .post(EndPoints.RATINGS, rating);
  }
}
