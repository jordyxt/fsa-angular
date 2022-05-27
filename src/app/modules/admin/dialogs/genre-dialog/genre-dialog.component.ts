import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Genre} from '../../models/genre.model';
import {GenreService} from '../../services/genre.service';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.css']
})
export class GenreDialogComponent {
  genre: Genre;
  title: string;
  oldName: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: Genre, private genreService: GenreService, private dialog: MatDialog) {
    this.title = data ? 'Update Genre' : 'Create Genre';
    this.genre = data ? data : {
      name: undefined, description: undefined
    };
    this.oldName = data ? data.name : undefined;
  }

  isCreate(): boolean {
    return this.oldName === undefined;
  }

  create(): void {
    this.genreService
      .create(this.genre)
      .subscribe(() => this.dialog.closeAll());
  }

  update(): void {
    this.genreService
      .update(this.oldName, this.genre)
      .subscribe(() => this.dialog.closeAll());
  }

  invalid(): boolean {
    return this.check(this.genre.name) || this.check(this.genre.description);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
