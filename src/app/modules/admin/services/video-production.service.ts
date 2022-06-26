import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {EndPoints} from '@shared/end-points';
import {VideoProductionFilter} from '@shared/models/video-production-filter.model';
import {VideoProductionSearch} from '../../home/models/video-production-search.model';

@Injectable({
  providedIn: 'root',
})
export class VideoProductionService {
  static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  search(videoProductionSearch: VideoProductionFilter): Observable<VideoProductionSearch[]> {
    return this.httpService
      .paramsFrom(videoProductionSearch)
      .get(EndPoints.VIDEO_PRODUCTIONS + VideoProductionService.SEARCH);
  }
}
