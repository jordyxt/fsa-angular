import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {FilmSearch} from '../../home/models/film-search.model';
import {FilmFilter} from '@shared/models/film-filter.model';
import {EndPoints} from '@shared/end-points';
import {Genre} from '../models/genre.model';
import {Film} from '../models/film.model';
import {Rating} from '../models/rating.model';
import {Message} from '../models/message.model';
import {MessageSearch} from '../../forum/models/message-search.model';
import {MessageFilter} from '../../forum/models/message-filter.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  search(messageFilter: MessageFilter): Observable<MessageSearch[]> {
    return this.httpService
      .paramsFrom(messageFilter)
      .get(EndPoints.MESSAGES + MessageService.SEARCH);
  }
  create(message: Message): Observable<void> {
    return this.httpService
      .post(EndPoints.MESSAGES, message);
  }
}
