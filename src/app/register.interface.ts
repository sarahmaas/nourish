import { RegisterData } from 'angular-token';

// register.interface.ts
// this should always match the API POST /auth
// defaultServings must be converted to a number within the API

export interface RegisterUser extends RegisterData {
  nickname: string;
  first_name: string;
  last_name: string;
  default_servings: string;
  image: string;
  login: string;
  password: string;
  passwordConfirmation: string;
  confirmSuccessUrl: string;
}
