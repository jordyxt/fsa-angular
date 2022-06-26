import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FilmService} from '../../services/film.service';
import {Film} from '../../models/film.model';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';
import {SeriesService} from '../../services/series.service';
import {Series} from '../../models/series.model';

@Component({
  selector: 'app-series-dialog',
  templateUrl: './series-dialog.component.html',
  styleUrls: ['./series-dialog.component.css']
})
export class SeriesDialogComponent implements AfterViewInit  {

  series: Series;
  title: string;
  oldTitle: string;
  releaseDate: Date;
  endingDate: Date;
  @ViewChild(GenreFilterComponent) genreFilter;
  @ViewChild('directorFilter') directorFilter;
  @ViewChild('actorFilter') actorFilter;
  constructor(@Inject(MAT_DIALOG_DATA) data: Series, private seriesService: SeriesService, private dialog: MatDialog) {
    this.title = data ? 'Update series' : 'Create series';
    this.releaseDate = undefined;
    this.series = data ? data : {
      title: undefined, description: undefined, releaseDate: undefined, seasons: undefined, endingDate: undefined,
      genreList: [], trailer: undefined, poster: undefined, directorList: [], actorList: []
    };
    this.oldTitle = data ? data.title : undefined;
  }

  isCreate(): boolean {
    return this.oldTitle === undefined;
  }

  create(): void {
    this.seriesService
      .create(this.series)
      .subscribe(() => this.dialog.closeAll());
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
  invalid(): boolean {
    this.series.releaseDate = this.getDateString(this.releaseDate);
    this.series.endingDate = this.getDateString(this.endingDate);
    return this.check(this.series.title) || this.check(this.series.description) ||
              this.check(this.series.releaseDate) || this.check(this.series.endingDate);
  }
  getDateString(dateString: Date): string{
    return dateString ? (dateString.getFullYear() +
      '-' + (((dateString.getMonth()) < 9) ?
        ('0' + (dateString.getMonth() + 1)) : (dateString.getMonth() + 1)) +
      '-' + ((dateString.getDate() < 9) ?
        ('0' + dateString.getDate()) : dateString.getDate())) : undefined;
  }
  onFileSelected(event): void {
    const inputNode = event.target;

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.series.poster = e.target.result;
      };

      reader.readAsDataURL(inputNode.files[0]);
    }
  }
  ngAfterViewInit(): void {
    this.series.genreList = this.genreFilter.genres;
    this.series.directorList = this.directorFilter.workers;
    this.series.actorList = this.actorFilter.workers;
  }
}
