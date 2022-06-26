import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '@core/services/http.service';
import {Worker} from '../models/worker.model';
import {EndPoints} from '@shared/end-points';
import {WorkerFilter} from '@shared/models/worker-filter.model';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  static SEARCH = '/search';

  constructor(private httpService: HttpService) {
  }

  create(worker: Worker): Observable<Worker> {
    return this.httpService
      .post(EndPoints.WORKERS, worker);
  }

  read(id: number): Observable<Worker> {
    return this.httpService
      .get(EndPoints.WORKERS + '/' + id);
  }

  update(id: number, worker: Worker): Observable<Worker> {
    return this.httpService
      .successful()
      .put(EndPoints.WORKERS + '/' + id, worker);
  }

  search(workerSearch: WorkerFilter): Observable<Worker[]> {
    return this.httpService
      .paramsFrom(workerSearch)
      .get(EndPoints.WORKERS + WorkerService.SEARCH);
  }

  delete(id: number): Observable<Worker> {
    return this.httpService
      .successful()
      .delete(EndPoints.WORKERS + '/' + id);
  }
}
