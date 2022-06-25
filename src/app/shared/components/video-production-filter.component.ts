import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {WorkerService} from '../../modules/admin/services/worker.service';
import {VideoProductionService} from '../../modules/admin/services/video-production.service';

@Component({
  selector: 'app-video-production-filter',
  templateUrl: 'video-production-filter.component.html',
  styleUrls: ['worker-filter.component.css'],
})
export class VideoProductionFilterComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  videoProductionCtrl = new FormControl('');
  filteredVideoProductions: Observable<string[]>;
  videoProductions: string[] = [];
  allVideoProductions: Observable<string[]> = of([]);
  @ViewChild('videoProductionInput') videoProductionInput: ElementRef<HTMLInputElement>;
  constructor(private videoProductionService: VideoProductionService) {
    this.allVideoProductions = this.videoProductionService.search({}).
    pipe(map(videoProductions => videoProductions.map(videoProduction => videoProduction.title)));
    this.videoProductionCtrl.valueChanges.subscribe(value => {
      this.filteredVideoProductions = value ? this.videoProductionService.search({title: value}).
      pipe(map(videoProductions => videoProductions.map(videoProduction => videoProduction.title))) : of([]);
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our video production
    if (value && !this.videoProductions.includes(value)) {
      this.allVideoProductions.subscribe(videoProductions => {
        if (videoProductions.includes(value)) {
          this.videoProductions.splice(0);
          this.videoProductions.push(value);
        }
      });
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }

    this.videoProductionCtrl.setValue(null);
  }

  remove(worker: string): void {
    const index = this.videoProductions.indexOf(worker);

    if (index >= 0) {
      this.videoProductions.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.videoProductions.includes(event.option.viewValue)){
      this.videoProductions.splice(0);
      this.videoProductions.push(event.option.viewValue);
    }
    this.videoProductionInput.nativeElement.value = '';
    this.videoProductionInput.nativeElement.blur();
    this.videoProductionCtrl.setValue(null);
  }
}
