import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {GenreService} from '../../modules/admin/services/genre.service';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-genre-filter',
  templateUrl: 'genre-filter.component.html',
  styleUrls: ['genre-filter.component.css'],
})
export class GenreFilterComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  genreCtrl = new FormControl('');
  genres: string[] = [];
  allGenres: Observable<string[]> = of([]);
  @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;
  constructor(private genreService: GenreService) {
    this.allGenres = this.genreService.search({}).pipe(map(genres => genres.map(genre => genre.name)
    ));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our genre
    if (value) {
      this.genres.push(value);
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }

    this.genreCtrl.setValue(null);
  }

  remove(genre: string): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.genres.push(event.option.viewValue);
    this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }
}
