import { Component } from '@angular/core';
import {GenreSearch} from '@shared/models/genre-search.model';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {GenreService} from '../../services/genre.service';
import {map} from 'rxjs/operators';
import {GenreDialogComponent} from '../../dialogs/genre-dialog/genre-dialog.component';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {Genre} from '../../models/genre.model';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.css']
})
export class GenrePageComponent {
  genreSearch: GenreSearch;
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
  }

  create(): void {
    this.dialog.open(GenreDialogComponent).afterClosed().subscribe(() =>
      this.search()
    );
  }

  update(genre: Genre): void {
    this.genreService.read(genre.name)
      .subscribe(fullTag => this.dialog.open(GenreDialogComponent, {data: fullTag}).afterClosed().subscribe(() =>
        this.search()
      ));
  }

  read(genre: Genre): void {
    this.dialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Tag Details',
        object: of(genre)
      }
    });
  }
}
