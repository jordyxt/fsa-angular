import {Component, OnInit} from '@angular/core';
import {FilmService} from '../../../admin/services/film.service';
import {ActivatedRoute} from '@angular/router';
import {Film} from '../../../admin/models/film.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {RatingService} from '../../../admin/services/rating.service';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.css']
})
export class FilmPageComponent implements OnInit {
  film: Film;
  mobile: boolean;
  trailer: SafeResourceUrl;
  rating: number;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private filmService: FilmService,
              private ratingService: RatingService, private authService: AuthService) {
    this.film = {
      title: undefined, description: undefined, releaseDate: undefined,
      genreList: [], trailer: undefined, poster: undefined, rating: undefined
    };
    this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  ngOnInit(): void {
    if (window.screen.width === 425) {
      this.mobile = true;
    }
    this.route.params.subscribe(params => {
      this.filmService.read(params.id).subscribe(value => {
        this.film = value;
        this.film.poster = this.filmService.pictures(params.id);
        this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(value.trailer);
      });
      if (this.isAuthenticated()){
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
    this.ratingService.create({videoProductionId: this.film.id, rating: event.value}).subscribe(() => {});
  }
}
