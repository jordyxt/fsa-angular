import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {GenreService} from '../../modules/admin/services/genre.service';
import {any} from 'codelyzer/util/function';
import {WorkerRole} from '../../modules/admin/models/worker-role.model';

@Component({
  selector: 'app-worker-role-filter',
  templateUrl: 'worker-role-filter.component.html',
  styleUrls: ['worker-role-filter.component.css'],
})
export class WorkerRoleFilterComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  workerRoleCtrl = new FormControl('');
  filteredWorkerRoles: Observable<string[]>;
  workerRoles: string[] = [];
  allWorkerRoles: string[] = Object.values(WorkerRole);
  @ViewChild('workerRoleInput') workerRoleInput: ElementRef<HTMLInputElement>;
  constructor() {
    this.filteredWorkerRoles = this.workerRoleCtrl.valueChanges.pipe(startWith(null),
      map((workerRole: string | null) => (workerRole ? this._filter(workerRole) : this.allWorkerRoles.slice())),
      );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our worker Role
    if (value && !this.workerRoles.includes(value) && this.allWorkerRoles.includes(value)) {
          this.workerRoles.push(value);
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }

    this.workerRoleCtrl.setValue(null);
  }

  remove(workerRole: string): void {
    const index = this.workerRoles.indexOf(workerRole);

    if (index >= 0) {
      this.workerRoles.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.workerRoles.includes(event.option.viewValue)){
      this.workerRoles.push(event.option.viewValue);
    }
    this.workerRoleInput.nativeElement.value = '';
    this.workerRoleInput.nativeElement.blur();
    this.workerRoleCtrl.setValue(null);
  }
  _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    console.log(this.allWorkerRoles);
    return this.allWorkerRoles.filter(workerRole => workerRole.toUpperCase().includes(filterValue));
  }
}
