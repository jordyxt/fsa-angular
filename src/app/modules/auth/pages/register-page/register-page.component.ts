import {Component, Inject} from '@angular/core';

import {HttpService} from '@core/services/http.service';
import {User} from '@core/models/user.model';
import {Role} from '@core/models/role.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  static USER = '/users';
  user: User;
  hide = true;

  constructor(  private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {
    this.user = {
      username: undefined, email: undefined, password: undefined, role: Role.USER, active: undefined, registrationDate: new Date()
    };
  }
  register(): void {
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
