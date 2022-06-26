import {Component} from '@angular/core';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {VideoProductionService} from '../../../admin/services/video-production.service';
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
            releaseYear: videoProduction.releaseYear,
            genreList: videoProduction.genreList,
            rating: videoProduction.rating,
            videoProductionType: videoProduction.videoProductionType,
            myRating: videoProduction.myRating,
            poster: this.videoProductionService.pictures(videoProduction.id)
          };
        }
      )
    ));
  }

  resetSearch(): void {
    this.videoProductionMyListSearch = {};
    this.search();
  }
}
