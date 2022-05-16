import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpService} from '@core/services/http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RoleGuardService} from '@core/guards/role.guard.service';
import {TokenInterceptor} from '@core/interceptors/token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    HttpService,
    RoleGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {
}
