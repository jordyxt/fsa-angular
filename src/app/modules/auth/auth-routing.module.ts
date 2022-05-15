import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
