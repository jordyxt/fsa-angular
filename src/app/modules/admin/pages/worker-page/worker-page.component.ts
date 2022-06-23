import { Component } from '@angular/core';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {GenreDialogComponent} from '../../dialogs/genre-dialog/genre-dialog.component';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {Worker} from '../../models/worker.model';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {WorkerFilter} from '@shared/models/worker-filter.model';
import {WorkerService} from '../../services/worker.service';

@Component({
  selector: 'app-worker-page',
  templateUrl: './worker-page.component.html',
  styleUrls: ['./worker-page.component.css']
})
export class WorkerPageComponent {
  workerSearch: WorkerFilter;
  title = 'Genres management';
  workers = of([]);
  constructor( private dialog: MatDialog, private workerService: WorkerService) {
    this.resetSearch();
  }
  search(): void {
    this.workers = this.workerService.search(this.workerSearch).pipe(map(workers =>
      workers.map(worker => {
          return {
            id: worker.id,
            name: worker.name,
            description: worker.description,
            bornDate: worker.birthdate
          };
        }
      )
    ));
  }
  resetSearch(): void {
    this.workerSearch = {};
    this.search();
  }

  create(): void {
    this.dialog.open(GenreDialogComponent).afterClosed().subscribe(() =>
      this.search()
    );
  }

  update(worker: Worker): void {
    this.workerService.read(worker.id)
      .subscribe(fullGenre => this.dialog.open(GenreDialogComponent, {data: fullGenre}).afterClosed().subscribe(() =>
        this.search()
      ));
  }

  read(worker: Worker): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Worker Details',
        object: of(worker)
      }
    });
  }

  delete(worker: Worker): void {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.workerService.delete(worker.id).subscribe(
            () => this.search()
          );
        }
      }
    );
  }
}
