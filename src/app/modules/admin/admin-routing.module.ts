import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenrePageComponent} from './pages/genre-page/genre-page.component';
import {WorkerPageComponent} from './pages/worker-page/worker-page.component';
import {RoleGuardService} from '@core/guards/role.guard.service';
import {Role} from '@core/models/role.model';


const routes: Routes = [
  {
    path: 'genres',
    component: GenrePageComponent,
    canActivate: [RoleGuardService],
    data: {roles: [Role.ADMIN]}
  },
  {
    path: 'workers',
    component: WorkerPageComponent,
    canActivate: [RoleGuardService],
    data: {roles: [Role.ADMIN]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
