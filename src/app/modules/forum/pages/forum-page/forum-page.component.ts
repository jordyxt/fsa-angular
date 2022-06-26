import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FilmFilter} from '@shared/models/film-filter.model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {WorkerFilterComponent} from '@shared/components/worker-filter.component';
import {TopicFilter} from '../../models/topic-filter.model';
import {TopicService} from '../../../admin/services/topic.service';
import {TopicDialogComponent} from '../../dialogs/topic-dialog/topic-dialog.component';
import {TopicSearch} from '../../models/topic-search.model';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent  implements AfterViewInit {
  topicSearch: TopicFilter;
  title = 'Forum';
  topics: Observable<TopicSearch[]> = of([]);
  constructor(private dialog: MatDialog, private topicService: TopicService, private authService: AuthService) {
    this.resetSearch();
  }
  search(): void {
    this.topics = this.topicService.search(this.topicSearch).pipe(map(topics =>
      topics.map(topic => {
          return {
            id: topic.id,
            title: topic.title,
            description: topic.description,
            videoProductionTitle: topic.videoProductionTitle,
            creationDate: topic.creationDate,
            username: topic.username
          };
        }
      )
    ));
  }
  create(): void {
    this.dialog.open(TopicDialogComponent, { disableClose: true }).afterClosed().subscribe(() =>
      this.search()
    );
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  resetSearch(): void {
    this.topicSearch = {};

    this.search();
  }
  ngAfterViewInit(): void {
  }
}
