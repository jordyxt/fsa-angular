import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FilmFilter} from '@shared/models/film-filter.model';
import {Observable, of} from 'rxjs';
import {FilmService} from '../../../admin/services/film.service';
import {map} from 'rxjs/operators';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';
import {GenreDialogComponent} from '../../../admin/dialogs/genre-dialog/genre-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FilmDialogComponent} from '../../../admin/dialogs/film-dialog/film-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {Film} from '../../models/film.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.css']
})
export class FilmPageComponent implements OnInit {
  film: Film;
  mobile: boolean;
  trailer: SafeResourceUrl;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private filmService: FilmService) {
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
        console.log(value);
      });
    });
  }
}
