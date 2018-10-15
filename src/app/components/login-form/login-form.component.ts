import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  signInUser = {
    login: '',
    password: ''
  };

  @Output() formResult = new EventEmitter<any>();

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSignInSubmit() {

    this.authService.logInUser(this.signInUser).subscribe(
        res => {
          if (res.status === 200) {
            this.formResult.emit({signedIn: true, res});
          }
        },
        err => {
          console.log('err:', err);
          this.formResult.emit({
            signedIn: false,
            err: `${err.status} ${err.statusText}`
          });
        }
    );

  }

}
