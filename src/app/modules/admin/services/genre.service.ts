import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {Genre} from '../models/genre.model';
import {GenreSearch} from '@shared/models/genre-search.model';
import {EndPoints} from '@shared/end-points';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  create(genre: Genre): Observable<Genre> {
    return this.httpService
      .post(EndPoints.GENRES, genre);
  }

  read(name: string): Observable<Genre> {
    return this.httpService
      .get(EndPoints.GENRES + '/' + name);
  }

  update(oldName: string, genre: Genre): Observable<Genre> {
    return this.httpService
      .successful()
      .put(EndPoints.GENRES + '/' + oldName, genre);
  }

  search(tagSearch: GenreSearch): Observable<Genre[]> {
    return this.httpService
      .paramsFrom(tagSearch)
      .get(EndPoints.GENRES + GenreService.SEARCH);
  }
}
