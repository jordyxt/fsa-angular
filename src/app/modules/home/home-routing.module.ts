import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home.component';
import {FilmSearchPageComponent} from './pages/film-search-page/film-search-page.component';
import {SeriesSearchPageComponent} from './pages/series-search-page/series-search-page.component';
import {FilmPageComponent} from './pages/film-page/film-page.component';
import {SeriesPageComponent} from './pages/series-page/series-page.component';
import {MyListPageComponent} from './pages/my-list-page/my-list-page.component';
import {RoleGuardService} from '@core/guards/role.guard.service';
import {Role} from '@core/models/role.model';

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
    path: 'my-list',
    component: MyListPageComponent,
    canActivate: [RoleGuardService],
    data: {roles: [Role.ADMIN, Role.BASIC]}
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
