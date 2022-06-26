import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Worker} from '../../models/worker.model';
import {WorkerService} from '../../services/worker.service';
import {WorkerRoleFilterComponent} from '@shared/components/worker-role-filter.component';

@Component({
  selector: 'app-worker-dialog',
  templateUrl: './worker-dialog.component.html',
  styleUrls: ['./worker-dialog.component.css']
})
export class WorkerDialogComponent implements AfterViewInit {
  worker: Worker;
  title: string;
  id: number;
  birthdate: Date;
  @ViewChild(WorkerRoleFilterComponent) workerRoleFilter;

  constructor(@Inject(MAT_DIALOG_DATA) data: Worker, private workerService: WorkerService, private dialog: MatDialog) {
    this.title = data ? 'Update Worker' : 'Create Worker';
    this.worker = data ? data : {
      name: undefined, description: undefined, birthdate: undefined, videoProductionWorkerRoleList: []
    };
    this.id = data ? data.id : undefined;
    this.birthdate = data && data.birthdate ? new Date(data.birthdate) : undefined;
  }

  ngAfterViewInit(): void {
    this.workerRoleFilter.workerRoles = this.worker.videoProductionWorkerRoleList;
    this.worker.videoProductionWorkerRoleList = this.workerRoleFilter.workerRoles;
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
    this.worker.birthdate = this.birthdate ?
      (this.birthdate.getFullYear() +
        '-' + (((this.birthdate.getMonth()) < 9) ?
          ('0' + (this.birthdate.getMonth() + 1)) : (this.birthdate.getMonth() + 1)) +
        '-' + ((this.birthdate.getDate() < 10) ?
          ('0' + this.birthdate.getDate()) : this.birthdate.getDate())) : undefined;
    return this.check(this.worker.name) || this.check(this.worker.description) || this.check(this.worker.birthdate);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
