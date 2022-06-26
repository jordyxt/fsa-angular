import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: '', loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule)}, // lazy load
  {path: 'forum', loadChildren: () => import('./modules/forum/forum.module').then(module => module.ForumModule)}, // lazy load
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(module => module.AdminModule)}, // lazy load
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(module => module.AuthModule)}, // lazy load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
