import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { AuthService } from '../../services/auth.service';

import { RegisterUser } from '../../register.interface';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  signUpUser: RegisterUser = {
    nickname: '',
    first_name: '',
    last_name: '',
    default_servings: '2',
    image: '',
    login: '',
    password: '',
    passwordConfirmation: '',
    confirmSuccessUrl: ''
  };

  @Output() formResult = new EventEmitter<any>();

  constructor(private tokenAuthService: AngularTokenService, private authService: AuthService) {}

  ngOnInit() {}

  onSignUpSubmit() {

    this.tokenAuthService.registerAccount(this.signUpUser).subscribe(
        (res) => {
          if (res.status === 200) {
            this.formResult.emit({signedUp: true, res});
            this.signIn(this.signUpUser.login, this.signUpUser.password);
          }

        },

        (err) => {
          console.log(err);
          this.formResult.emit({
            signedUp: false,
            err: `${err.status} ${err.statusText}`
          });
        }
    );

  }

  signIn(login, password) {
    this.authService.logInUser({login, password}).subscribe(
      res => {
        if (res.status === 200) {
          this.formResult.emit({signedIn: true, res});
        }
      },
      err => {
        console.log('err:', err);
        this.formResult.emit({signedIn: false, err});
      }
    );
  }
}
