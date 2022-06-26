import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home.component';
import {FilmSearchPageComponent} from './pages/film-search-page/film-search-page.component';
import {SeriesSearchPageComponent} from './pages/series-search-page/series-search-page.component';
import {FilmPageComponent} from './pages/film-page/film-page.component';
import {SeriesPageComponent} from './pages/series-page/series-page.component';

const routes: Routes = [
  {
    path: 'home',
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
  },
  {
    path: 'series/:id',
    component: SeriesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
