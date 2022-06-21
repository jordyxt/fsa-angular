import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FilmService} from '../../services/film.service';
import {Film} from '../../models/film.model';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';

@Component({
  selector: 'app-film-dialog',
  templateUrl: './film-dialog.component.html',
  styleUrls: ['./film-dialog.component.css']
})
export class FilmDialogComponent implements AfterViewInit  {

  film: Film;
  title: string;
  oldTitle: string;
  releaseDate: Date;
  @ViewChild(GenreFilterComponent) genreFilter;
  constructor(@Inject(MAT_DIALOG_DATA) data: Film, private filmService: FilmService, private dialog: MatDialog) {
    this.title = data ? 'Update film' : 'Create Film';
    this.releaseDate = undefined;
    this.film = data ? data : {
      title: undefined, description: undefined, releaseDate: undefined, genreList: [], trailer: undefined, poster: undefined
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
  invalid(): boolean {
    this.film.releaseDate = this.releaseDate ?
      (this.releaseDate.getFullYear() +
        '-' + (((this.releaseDate.getMonth() + 1) < 9) ?
        ('0' + (this.releaseDate.getMonth() + 1)) : (this.releaseDate.getMonth() + 1)) +
        '-' + ((this.releaseDate.getDate() < 9) ?
          ('0' + this.releaseDate.getDate()) : this.releaseDate.getDate())) : undefined;
    return this.check(this.film.title) || this.check(this.film.description) || this.check(this.film.releaseDate);
  }
  onFileSelected(event): void {
    const inputNode = event.target;

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.film.poster = e.target.result;
      };

      reader.readAsDataURL(inputNode.files[0]);
    }
  }
  ngAfterViewInit(): void {
    this.film.genreList = this.genreFilter.genres;
  }
}
