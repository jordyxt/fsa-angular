
import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {FilmSearchPageComponent} from './pages/film-search-page/film-search-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    FilmSearchPageComponent
  ],
  entryComponents: [],
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class HomeModule {

}
