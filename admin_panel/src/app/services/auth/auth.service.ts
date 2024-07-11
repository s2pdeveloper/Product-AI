import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {map, catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import { ApiService } from 'src/app/core/services/httpApi.service';

@Injectable({
    providedIn: "root",
})
export class AuthService {
    // user: User;

    routes: any = {
        register: 'user/register',
        login: 'user/login',
        forget_password: 'user/forget-password',
        reset_password: 'user/reset-password',
        set_password: 'user/set-password',
      };

  constructor(private http: ApiService, public router: Router) {}

  createUser(userPayload) {
    return this.http.post(this.routes.register, userPayload);
  }

  login(loginPayload) {
    return this.http.post(this.routes.login, loginPayload).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('AIuser'));
    return user !== null;
  }

  logout(): void {
    // remove user from local storage to log user out
    if (typeof window !== 'undefined') {
      this.router.navigateByUrl('login');
      localStorage.removeItem('AIuser');
    }
  }
 
  forgetPassword(payload: any) {
    return this.http.post(this.routes.forget_password, payload).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }

  resetPass(payload: any) {
    return this.http.post(this.routes.reset_password, payload).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }
  setPass(payload: any) {
    return this.http.post(this.routes.set_password, payload).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }

    private handleErrorObservable(error: HttpErrorResponse) {
        return throwError(error);
    }
}

