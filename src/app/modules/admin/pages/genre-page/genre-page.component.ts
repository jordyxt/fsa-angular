import { Component } from '@angular/core';
import {GenreFilter} from '@shared/models/genre-filter.model';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {GenreService} from '../../services/genre.service';
import {map} from 'rxjs/operators';
import {GenreDialogComponent} from '../../dialogs/genre-dialog/genre-dialog.component';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {Genre} from '../../models/genre.model';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.css']
})
export class GenrePageComponent {
  genreSearch: GenreFilter;
  title = 'Genres management';
  genres = of([]);
  constructor( private dialog: MatDialog, private genreService: GenreService) {
    this.resetSearch();
  }
  search(): void {
    this.genres = this.genreService.search(this.genreSearch).pipe(map(genres =>
      genres.map(genre => {
          return {
            name: genre.name,
            description: genre.description
          };
        }
      )
    ));
  }
  resetSearch(): void {
    this.genreSearch = {};
    this.search();
  }

  create(): void {
    this.dialog.open(GenreDialogComponent).afterClosed().subscribe(() =>
      this.search()
    );
  }

  update(genre: Genre): void {
    this.genreService.read(genre.name)
      .subscribe(fullGenre => this.dialog.open(GenreDialogComponent, {data: fullGenre}).afterClosed().subscribe(() =>
        this.search()
      ));
  }

  read(genre: Genre): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Genre Details',
        object: of(genre)
      }
    });
  }

  delete(genre: Genre): void {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.genreService.delete(genre.name).subscribe(
            () => this.search()
          );
        }
      }
    );
  }
}
