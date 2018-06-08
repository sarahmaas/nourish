import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Angular2TokenService} from "angular2-token";
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
    email: '',
    password: '',
    passwordConfirmation: '',
    confirmSuccessUrl: ''
  };

  @Output() onFormResult = new EventEmitter<any>();

  constructor(private tokenAuthService:Angular2TokenService, private authService: AuthService) {}

  ngOnInit() {}


  onSignUpSubmit(){

    this.tokenAuthService.registerAccount(this.signUpUser).subscribe(
        (res) => {
          if (res.status == 200){
            this.onFormResult.emit({signedUp: true, res})
            this.signIn(this.signUpUser.email, this.signUpUser.password);
          }

        },

        (err) => {
          console.log(err.json())
          this.onFormResult.emit({signedUp: false, err})
        }
    )

  }

  signIn(email, password) {
    this.authService.logInUser({email, password}).subscribe(
      res => {
        if(res.status == 200){
          this.onFormResult.emit({signedIn: true, res});
        }
      },
      err => {
        console.log('err:', err);
        this.onFormResult.emit({signedIn: false, err});
      }
    );
  }
}