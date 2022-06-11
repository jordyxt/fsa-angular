import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {FormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material.module';
import {HttpService} from '@core/services/http.service';
import {GenrePageComponent} from './pages/genre-page/genre-page.component';
import {GenreDialogComponent} from './dialogs/genre-dialog/genre-dialog.component';
import {SharedModule} from '@shared/shared.module';
import {FilmDialogComponent} from './dialogs/film-dialog/film-dialog.component';

@NgModule({
  declarations: [
    GenrePageComponent,
    GenreDialogComponent,
    FilmDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],
  providers: [HttpService]
})
export class AdminModule { }
