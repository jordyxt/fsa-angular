import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string;
  password: string;
  constructor(  private auth: AuthService, private router: Router) {
  }

  login(): void {
    this.auth.login(this.username, this.password).subscribe(
      () => {
        if (this.auth.isBasic() || this.auth.isAdmin()) {
          this.router.navigate(['']).then();
        }
      }
    );
  }

}
