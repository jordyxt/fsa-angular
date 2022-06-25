import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';
import {WorkerFilterComponent} from '@shared/components/worker-filter.component';
import {TopicService} from '../../../admin/services/topic.service';
import {Topic} from '../../../admin/models/topic.model';

@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.css']
})
export class TopicDialogComponent implements AfterViewInit  {
  topic: Topic;
  title: string;
  id: number;
  @ViewChild(GenreFilterComponent) genreFilter;
  constructor(@Inject(MAT_DIALOG_DATA) data: Topic, private topicService: TopicService, private dialog: MatDialog) {
    this.title = data ? 'Update topic' : 'Create topic';
    this.topic = data ? data : {
      title: undefined, description: undefined, videoProduction: undefined
    };
    this.id = data ? data.id : undefined;
  }

  isCreate(): boolean {
    return this.id === undefined;
  }

  create(): void {
    this.topicService
      .create(this.topic)
      .subscribe(() => this.dialog.closeAll());
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
  invalid(): boolean {
    return this.check(this.topic.title) || this.check(this.topic.description);
  }
  ngAfterViewInit(): void {
  }
}
