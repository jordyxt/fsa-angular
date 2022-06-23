import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Worker} from '../../models/worker.model';
import {GenreService} from '../../services/genre.service';
import {WorkerService} from '../../services/worker.service';

@Component({
  selector: 'app-worker-dialog',
  templateUrl: './worker-dialog.component.html',
  styleUrls: ['./worker-dialog.component.css']
})
export class WorkerDialogComponent {
  worker: Worker;
  title: string;
  id: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: Worker, private workerService: WorkerService, private dialog: MatDialog) {
    this.title = data ? 'Update Genre' : 'Create Genre';
    this.worker = data   ? data : {
      name: undefined, description: undefined, birthdate: undefined
    };
    this.id = data ? data.id : undefined;
  }

  isCreate(): boolean {
    return this.id === undefined;
  }

  create(): void {
    this.workerService
      .create(this.worker)
      .subscribe(() => this.dialog.closeAll());
  }

  update(): void {
    this.workerService
      .update(this.id, this.worker)
      .subscribe(() => this.dialog.closeAll());
  }

  invalid(): boolean {
    return this.check(this.worker.name) || this.check(this.worker.description) || this.check(this.worker.birthdate);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
