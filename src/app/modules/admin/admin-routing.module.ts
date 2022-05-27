import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GenrePageComponent} from './pages/genre-page/genre-page.component';


const routes: Routes = [
  {
    path: 'genres',
    component: GenrePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
