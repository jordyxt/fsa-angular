import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {FormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material.module';
import {HttpService} from '@core/services/http.service';

@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [HttpService]
})
export class AuthModule { }
