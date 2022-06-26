import {Component} from '@angular/core';

import {HttpService} from '@core/services/http.service';
import {User} from '@core/models/user.model';
import {Role} from '@core/models/role.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {EndPoints} from '@shared/end-points';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  static BASIC_USER = '/basic-users';
  user: User;
  hide = true;

  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {
    this.user = {
      username: undefined, email: undefined, password: undefined, role: Role.BASIC, active: undefined, registrationDate: new Date()
    };
  }

  register(): void {
    this.httpService.post(EndPoints.USERS + RegisterPageComponent.BASIC_USER, this.user)
      .subscribe(() => {
        this.openSnackBar('User ' + this.user.username + ' successfully register.', 'OK');
      });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
