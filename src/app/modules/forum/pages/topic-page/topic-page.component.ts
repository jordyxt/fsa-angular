import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
import {Film} from '../../../admin/models/film.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {FilmService} from '../../../admin/services/film.service';
import {RatingService} from '../../../admin/services/rating.service';
import {Topic} from '../../../admin/models/topic.model';
import {MessageService} from '../../../admin/services/message.service';
import {MessageSearch} from '../../models/message-search.model';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent  implements OnInit {
  topic: Topic;
  rating: number;
  messages: Observable<MessageSearch[]>;
  newMessage: string;
  constructor(private route: ActivatedRoute, private topicService: TopicService,
              private messageService: MessageService, private authService: AuthService) {
    this.topic = {
      id: undefined, title: undefined, description: undefined, creationDate: undefined, videoProductionTitle: undefined,
      username: undefined
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topicService.read(params.id).subscribe(value => {
        this.topic = value;
      });
      this.search(params.id);
    });
  }
  search(id: number): void {
    this.messages = this.messageService.search({topicId: id}).pipe(map(messages =>
      messages.map(message => {
          return {
            message: message.message,
            username: message.username,
            creationDate: message.creationDate,
          };
        }
      )
    ));
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  sendMessage(): void {
    this.messageService.create({topicId: this.topic.id, message: this.newMessage}).subscribe(() => {
      this.search(this.topic.id);
    });
  }
}
