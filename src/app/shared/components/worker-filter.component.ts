import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {WorkerService} from '../../modules/admin/services/worker.service';

@Component({
  selector: 'app-worker-filter',
  templateUrl: 'worker-filter.component.html',
  styleUrls: ['worker-filter.component.css'],
})
export class WorkerFilterComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  workerCtrl = new FormControl('');
  filteredWorkers: Observable<string[]>;
  workers: string[] = [];
  allWorkers: Observable<string[]> = of([]);
  @ViewChild('workerInput') workerInput: ElementRef<HTMLInputElement>;

  constructor(private workerService: WorkerService) {
    this.allWorkers = this.workerService.search({}).pipe(map(workers => workers.map(worker => worker.name)));
    this.workerCtrl.valueChanges.subscribe(value => {
      this.filteredWorkers = value ? this.workerService.search({name: value}).
      pipe(map(workers => workers.map(worker => worker.name))) : of([]);
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our worker
    if (value && !this.workers.includes(value)) {
      this.allWorkers.subscribe(workers => {
        if (workers.includes(value)) {
          this.workers.push(value);
        }
      });
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }

    this.workerCtrl.setValue(null);
  }

  remove(worker: string): void {
    const index = this.workers.indexOf(worker);

    if (index >= 0) {
      this.workers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.workers.includes(event.option.viewValue)) {
      this.workers.push(event.option.viewValue);
    }
    this.workerInput.nativeElement.value = '';
    this.workerInput.nativeElement.blur();
    this.workerCtrl.setValue(null);
  }
}
