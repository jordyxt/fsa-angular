import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FilmSearch} from '@shared/models/film-search.model';
import {of} from 'rxjs';
import {FilmService} from '../../services/film.service';
import {map} from 'rxjs/operators';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';

@Component({
  selector: 'app-film-search-page',
  templateUrl: './film-search-page.component.html',
  styleUrls: ['./film-search-page.component.css']
})
export class FilmSearchPageComponent  implements AfterViewInit {
  filmSearch: FilmSearch;
  title = 'Films';
  films = of([]);
  genres = [];
  removeGenres = Function;
  @ViewChild(GenreFilterComponent) genreFilter;
  constructor(private filmService: FilmService) {
    this.resetSearch();
  }
  search(): void {
    this.filmSearch.genreList = this.genres;
    console.log(this.filmSearch);
    this.films = this.filmService.search(this.filmSearch).pipe(map(films =>
      films.map(film => {
          return {
            title: film.title,
            description: film.description,
            release_date: film.release_date,
            genreList: film.genreList
          };
        }
      )
    ));
  }
  resetSearch(): void {
    this.filmSearch = {};
    this.genres.splice(0);
    this.search();
  }
  ngAfterViewInit(): void {
    this.genres = this.genreFilter.genres;
  }
}
