import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GenrePageComponent} from './pages/genre-page/genre-page.component';
import {WorkerPageComponent} from './pages/worker-page/worker-page.component';


const routes: Routes = [
  {
    path: 'genres',
    component: GenrePageComponent
  },
  {
    path: 'workers',
    component: WorkerPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
