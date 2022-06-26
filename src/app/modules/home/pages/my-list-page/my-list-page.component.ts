import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FilmFilter} from '@shared/models/film-filter.model';
import {of} from 'rxjs';
import {FilmService} from '../../../admin/services/film.service';
import {map} from 'rxjs/operators';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';
import {MatDialog} from '@angular/material/dialog';
import {FilmDialogComponent} from '../../../admin/dialogs/film-dialog/film-dialog.component';
import {WorkerFilterComponent} from '@shared/components/worker-filter.component';
import {AuthService} from '../../../auth/services/auth.service';
import {VideoProductionService} from '../../../admin/services/video-production.service';
import {VideoProductionMyListSearch} from '../../models/video-production-my-list-search.model';
import {VideoProductionMyListFilter} from '@shared/models/video-production-my-list-filter.model';

@Component({
  selector: 'app-my-list-page',
  templateUrl: './my-list-page.component.html',
  styleUrls: ['./my-list-page.component.css']
})
export class MyListPageComponent {
  videoProductionMyListSearch: VideoProductionMyListFilter;
  title = 'My List';
  videoProductions = of([]);
  constructor(private dialog: MatDialog, private videoProductionService: VideoProductionService) {
    this.resetSearch();
  }

  search(): void {
    this.videoProductions = this.videoProductionService.searchMyList(this.videoProductionMyListSearch).pipe(map(videoProductions =>
      videoProductions.map(videoProduction => {
          return {
            id: videoProduction.id,
            title: videoProduction.title,
            rating: videoProduction.rating,
            videoProductionType: videoProduction.videoProductionType,
            poster: this.videoProductionService.pictures(videoProduction.id)
          };
        }
      )
    ));
  }

  create(): void {
    this.dialog.open(FilmDialogComponent, {disableClose: true}).afterClosed().subscribe(() =>
      this.search()
    );
  }

  resetSearch(): void {
    this.videoProductionMyListSearch = {};
    this.search();
  }
}
