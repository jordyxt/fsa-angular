import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {FilmSearch} from '../../home/models/film-search.model';
import {FilmFilter} from '@shared/models/film-filter.model';
import {EndPoints} from '@shared/end-points';
import {Topic} from '../models/topic.model';
import {TopicFilter} from '../../forum/models/topic-filter.model';
import {TopicSearch} from '../../forum/models/topic-search.model';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  read(id: number): Observable<Topic> {
    return this.httpService
      .get(EndPoints.TOPICS + '/' + id);
  }

  create(topic: Topic): Observable<Topic> {
    return this.httpService
      .post(EndPoints.TOPICS, topic);
  }

  search(topicSearch: TopicFilter): Observable<TopicSearch[]> {
    return this.httpService
      .paramsFrom(topicSearch)
      .get(EndPoints.TOPICS + TopicService.SEARCH);
  }
}
