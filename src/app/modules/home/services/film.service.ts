import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {Film} from '../models/film.model';
import {FilmSearch} from '@shared/models/film-search.model';
import {EndPoints} from '@shared/end-points';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  read(name: string): Observable<Film> {
    return this.httpService
      .get(EndPoints.FILMS + '/' + name);
  }

  search(filmSearch: FilmSearch): Observable<Film[]> {
    // return this.httpService
    //  .paramsFrom(filmSearch)
    //  .get(EndPoints.FILMS + FilmService.SEARCH);
    return of([{title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']},
                    {title: 'Example', description: 'This is an example', release_date: new Date(), genreList: ['action', 'sci-fi']}]);
  }
}
