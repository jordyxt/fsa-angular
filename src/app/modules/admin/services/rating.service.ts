import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@shared/end-points';
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
