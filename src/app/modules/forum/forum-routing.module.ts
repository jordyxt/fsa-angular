import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForumPageComponent} from './pages/forum-page/forum-page.component';
import {TopicPageComponent} from './pages/topic-page/topic-page.component';


const routes: Routes = [
  {
    path: '',
    component: ForumPageComponent
  },
  {
    path: 'topics/:id',
    component: TopicPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule {
}
