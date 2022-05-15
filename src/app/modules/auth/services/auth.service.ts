import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '@env';
import {User} from '@core/models/user-login.model';
import {HttpService} from '@core/services/http.service';
import {Role} from '@core/models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static END_POINT = environment.REST_FSA + '/users/token';
  private user: User;
  password: string = undefined;
  private onLogin$ = new Subject<User>();

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(username: string, password: string): Observable<User> {
    return this.httpService.authBasic(username, password)
      .post(AuthService.END_POINT)
      .pipe(
        map(jsonToken => {
          const jwtHelper = new JwtHelperService();
          this.user = jsonToken; // {token:jwt} => user.token = jwt
          this.user.username = jwtHelper.decodeToken(jsonToken.token).user;  // secret key is not necessary
          this.user.role = jwtHelper.decodeToken(jsonToken.token).role;
          this.password = password;
          this.onLogin$.next(this.user);
          return this.user;
        })
      );
  }

  onLogin(): Observable<User> {
    return this.onLogin$.asObservable();
  }

  logout(): void {
    this.user = undefined;
    this.router.navigate(['']).then();
  }

  isAuthenticated(): boolean {
    return this.user != null && !(new JwtHelperService().isTokenExpired(this.user.token));
  }

  hasRoles(roles: Role[]): boolean {
    return this.isAuthenticated() && roles.includes(this.user.role);
  }

  isAdmin(): boolean {
    return this.hasRoles([Role.ADMIN]);
  }

  isBasic(): boolean {
    return this.hasRoles([Role.BASIC]);
  }

  getUsername(): string {
    return this.user ? this.user.username : undefined;
  }

  getToken(): string {
    return this.user ? this.user.token : undefined;
  }

  getRole(): Role{
    return this.user  ? this.user.role : undefined;
  }

  getPassword(): string{
    return this.user ? this.password : undefined;
  }

  setUser(user: User): void{
    this.user = user;
  }

}
