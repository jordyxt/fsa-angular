import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
})
export class MenuComponent {
  title = 'FSA';
  username = undefined;

  constructor(private dialog: MatDialog, private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
  }


  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
