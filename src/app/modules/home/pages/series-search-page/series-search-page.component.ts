import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SeriesFilter} from '@shared/models/series-filter.model';
import {of} from 'rxjs';
import {SeriesService} from '../../../admin/services/series.service';
import {map} from 'rxjs/operators';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';
import {SeriesDialogComponent} from '../../../admin/dialogs/series-dialog/series-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {WorkerFilterComponent} from '@shared/components/worker-filter.component';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-series-search-page',
  templateUrl: './series-search-page.component.html',
  styleUrls: ['./series-search-page.component.css']
})
export class SeriesSearchPageComponent implements AfterViewInit {
  seriesSearch: SeriesFilter;
  title = 'Series';
  seriesList = of([]);
  genres: string[] = [];
  workers: string[] = [];
  @ViewChild(GenreFilterComponent) genreFilter;
  @ViewChild(WorkerFilterComponent) workerFilter;

  constructor(private dialog: MatDialog, private seriesService: SeriesService, private authService: AuthService) {
    this.resetSearch();
  }

  search(): void {
    if (this.genres.length !== 0) {
      this.seriesSearch.genreList = this.genres;
    }
    if (this.workers.length !== 0) {
      this.seriesSearch.workerList = this.workers;
    }
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

  create(): void {
    this.dialog.open(SeriesDialogComponent, {disableClose: true}).afterClosed().subscribe(() =>
      this.search()
    );
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  resetSearch(): void {
    this.seriesSearch = {};
    this.genres.splice(0);
    this.workers.splice(0);
    this.search();
  }

  ngAfterViewInit(): void {
    this.genres = this.genreFilter.genres;
    this.workers = this.workerFilter.workers;
  }
}
