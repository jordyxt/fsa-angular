import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home.component';
import {FilmSearchPageComponent} from './pages/film-search-page/film-search-page.component';
import {SeriesSearchPageComponent} from './pages/series-search-page/series-search-page.component';
import {FilmPageComponent} from './pages/film-page/film-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'films',
    component: FilmSearchPageComponent
  },
  {
    path: 'series',
    component: SeriesSearchPageComponent
  },
  {
    path: 'films/:id',
    component: FilmPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
