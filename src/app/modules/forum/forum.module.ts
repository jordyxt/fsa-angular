import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material.module';
import {HttpService} from '@core/services/http.service';
import {SharedModule} from '@shared/shared.module';
import {ForumPageComponent} from './pages/forum-page/forum-page.component';
import {ForumRoutingModule} from './forum-routing.module';
import {TopicDialogComponent} from './dialogs/topic-dialog/topic-dialog.component';
import {TopicPageComponent} from './pages/topic-page/topic-page.component';

@NgModule({
  declarations: [
    ForumPageComponent,
    TopicDialogComponent,
    TopicPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ForumRoutingModule
  ],
  providers: [HttpService]
})
export class ForumModule { }
