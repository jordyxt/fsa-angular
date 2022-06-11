import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FilmSearch} from '../../../home/models/film-search.model';
import {FilmService} from '../../services/film.service';
import {of} from 'rxjs';
import {Film} from '../../../home/models/film.model';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './film-dialog.component.html',
  styleUrls: ['./film-dialog.component.css']
})
export class FilmDialogComponent  implements AfterViewInit  {
  film: Film;
  title: string;
  oldTitle: string;
  @ViewChild(GenreFilterComponent) genreFilter;
  constructor(@Inject(MAT_DIALOG_DATA) data: Film, private filmService: FilmService, private dialog: MatDialog) {
    this.title = data ? 'Update film' : 'Create Film';
    this.film = data ? data : {
      title: undefined, description: undefined, releaseYear: undefined, genreList: [], trailer: undefined
    };
    this.oldTitle = data ? data.title : undefined;
  }

  isCreate(): boolean {
    return this.oldTitle === undefined;
  }

  create(): void {
    this.filmService
      .create(this.film)
      .subscribe(() => this.dialog.closeAll());
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

  ngAfterViewInit(): void {
    this.film.genreList = this.genreFilter.genres;
  }
}
