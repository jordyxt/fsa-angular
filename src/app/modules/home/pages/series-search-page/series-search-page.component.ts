import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {SeriesSearch} from '@shared/models/series-search.model';
import {of} from 'rxjs';
import {SeriesService} from '../../services/series.service';
import {map} from 'rxjs/operators';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';

@Component({
  selector: 'app-series-search-page',
  templateUrl: './series-search-page.component.html',
  styleUrls: ['./series-search-page.component.css']
})
export class SeriesSearchPageComponent implements AfterViewInit {
  seriesSearch: SeriesSearch;
  title = 'Series';
  seriesList = of([]);
  genres: string[] = [];
  removeGenres = Function;
  @ViewChild(GenreFilterComponent) genreFilter;
  constructor(private seriesService: SeriesService) {
    this.resetSearch();
  }
  search(): void {
    if (this.genres.length !== 0){
      this.seriesSearch.genreList = this.genres;
      console.log(this.seriesSearch);
    }
    console.log(this.seriesSearch);
    this.seriesList = this.seriesService.search(this.seriesSearch).pipe(map(seriesList =>
      seriesList.map(series => {
        return {
            id: series.id,
            title: series.title,
            description: series.description,
            releaseYear: series.releaseYear,
            endingYear: series.endingYear,
            genreList: series.genreList,
            poster: this.seriesService.pictures(series.id)
          };
        }
      )
    ));
  }
  resetSearch(): void {
    this.seriesSearch = {};
    this.genres.splice(0);
    this.search();
  }
  ngAfterViewInit(): void {
    this.genres = this.genreFilter.genres;
  }
}
