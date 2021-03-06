import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {RatingService} from '../../../admin/services/rating.service';
import {AuthService} from '../../../auth/services/auth.service';
import {Series} from '../../../admin/models/series.model';
import {SeriesService} from '../../../admin/services/series.service';

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.css']
})
export class SeriesPageComponent implements OnInit {
  series: Series;
  mobile: boolean;
  trailer: SafeResourceUrl;
  rating: number;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private seriesService: SeriesService,
              private ratingService: RatingService, private authService: AuthService) {
    this.series = {
      title: undefined, description: undefined, releaseDate: undefined,
      genreList: [], trailer: undefined, poster: undefined, endingDate: undefined, seasons: undefined, rating: undefined,
      directorList: [], actorList: []
    };
    this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit(): void {
    if (window.screen.width === 425) {
      this.mobile = true;
    }
    this.route.params.subscribe(params => {
      this.seriesService.read(params.id).subscribe(value => {
        this.series = value;
        this.series.poster = this.seriesService.pictures(params.id);
        if (value.trailer) {
          this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(value.trailer);
        }

      });
      if (this.isAuthenticated()) {
        this.ratingService.read(params.id).subscribe(value => {
          this.rating = value;
        });
      }
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  sendRating(event): void {
    this.ratingService.create({videoProductionId: this.series.id, rating: event.value}).subscribe(() => {
    });
  }
}
