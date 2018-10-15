import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


import { RegisterUser } from '../register.interface';

@Injectable()
export class AuthService {

  userSignedIn$: Subject<boolean> = new Subject();

  constructor(private authService: AngularTokenService) {

    this.authService.validateToken().subscribe(
        res => res.status === 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    );
  }

  logOutUser(): Observable<HttpResponse<any>> {

    return this.authService.signOut().pipe(
      map(
        res => {
          this.userSignedIn$.next(false);
          return res;
        }
      )
    );
  }

  registerUser(signUpData: RegisterUser): Observable<HttpResponse<any>> {
    return this.authService.registerAccount(signUpData).pipe(
      map(
        res => {
          this.userSignedIn$.next(true);
          return res;
        }
      )
    );
  }

  logInUser(signInData: {login: string, password: string}): Observable<HttpResponse<any>> {

    return this.authService.signIn(signInData).pipe(
      map(
        res => {
          this.userSignedIn$.next(true);
          console.log(this.authService.currentUserData);
          console.log(res);
          console.log(this.userSignedIn$);
          return res;
        }
      )
    );
  }

  getUser() {
    return this.authService.currentUserData;
  }

}
