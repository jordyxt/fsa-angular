import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FilmFilter} from '@shared/models/film-filter.model';
import {of} from 'rxjs';
import {FilmService} from '../../../admin/services/film.service';
import {map} from 'rxjs/operators';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';
import {GenreDialogComponent} from '../../../admin/dialogs/genre-dialog/genre-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FilmDialogComponent} from '../../../admin/dialogs/film-dialog/film-dialog.component';

@Component({
  selector: 'app-film-search-page',
  templateUrl: './film-search-page.component.html',
  styleUrls: ['./film-search-page.component.css']
})
export class FilmSearchPageComponent  implements AfterViewInit {
  filmSearch: FilmFilter;
  title = 'Films';
  films = of([]);
  genres: string[] = [];
  @ViewChild(GenreFilterComponent) genreFilter;
  constructor(private dialog: MatDialog, private filmService: FilmService) {
    this.resetSearch();
  }
  search(): void {
    if (this.genres.length !== 0){
      this.filmSearch.genreList = this.genres;
      console.log(this.filmSearch);
    }
    console.log(this.filmSearch);
    this.films = this.filmService.search(this.filmSearch).pipe(map(films =>
      films.map(film => {
        return {
            id: film.id,
            title: film.title,
            description: film.description,
            releaseYear: film.releaseYear,
            genreList: film.genreList,
            poster: this.filmService.pictures(film.id)
          };
        }
      )
    ));
  }
  create(): void {
    this.dialog.open(FilmDialogComponent, { disableClose: true }).afterClosed().subscribe(() =>
      this.search()
    );
  }
  resetSearch(): void {
    this.filmSearch = {};
    this.genres.splice(0);
    this.search();
  }
  ngAfterViewInit(): void {
    this.genres = this.genreFilter.genres;
  }

  onSelect(filmSelected): void {
    console.log(filmSelected.selectedOptions.selected[0]?.value.id);
  }
}
