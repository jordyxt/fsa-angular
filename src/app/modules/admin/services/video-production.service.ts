import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@shared/end-points';
import {VideoProductionFilter} from '@shared/models/video-production-filter.model';
import {VideoProductionSearch} from '../../home/models/video-production-search.model';
import {VideoProductionMyListSearch} from '../../home/models/video-production-my-list-search.model';

@Injectable({
  providedIn: 'root',
})
export class VideoProductionService {
  static SEARCH = '/search';
  static SEARCH_MY_LIST = '/search-my-list';
  static PICTURES = '/pictures';

  constructor(private httpService: HttpService) {
  }

  search(videoProductionSearch: VideoProductionFilter): Observable<VideoProductionSearch[]> {
    return this.httpService
      .paramsFrom(videoProductionSearch)
      .get(EndPoints.VIDEO_PRODUCTIONS + VideoProductionService.SEARCH);
  }

  searchMyList(videoProductionSearch: VideoProductionFilter): Observable<VideoProductionMyListSearch[]> {
    return this.httpService
      .paramsFrom(videoProductionSearch)
      .get(EndPoints.VIDEO_PRODUCTIONS + VideoProductionService.SEARCH_MY_LIST);
  }

  pictures(id: number): string {
    return EndPoints.VIDEO_PRODUCTIONS + VideoProductionService.PICTURES + '/' + id;
  }
}
