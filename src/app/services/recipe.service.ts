// https://www.sitepoint.com/angular-rxjs-create-api-service-rest-backend/

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import {Angular2TokenService} from "angular2-token";
import {AuthService} from "./auth.service";
import { Recipe } from '../models/Recipe';
import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RecipeService {

  private userID: number;
  private jsonConvert: JsonConvert;

  constructor(private authTokenService: Angular2TokenService) {
    this.userID = this.authTokenService.currentUserData.id;
    this.jsonConvert = new JsonConvert();

  }

  // GET /users/:id/recipes
  public getUserRecipes(userID: number = this.userID): Observable<Recipe[]> {
    return this.authTokenService.get('/users/' + userID + '/recipes').map(
      res => {
          return this.jsonConvert.deserialize(res.json(), Recipe);
        }).catch(this.handleError);
  }

  // GET /users/:user_id/recipes/:id
  public getUserRecipeById(recipeID: number) {
    return this.authTokenService.get('/recipes/' + recipeID)
    .map(
      res => {
        let recipe: Recipe;
        recipe = this.jsonConvert.deserialize(res.json(), Recipe);
        return recipe;
      }
    ).catch(this.handleError);
  } 

  // GET /recipes --> gets all recipes
  public getAllRecipes(): Observable<Recipe[]> {
    return this.authTokenService.get('/recipes').map(
      res => {
        return this.jsonConvert.deserialize(res.json(), Recipe);
      }
    ).catch(this.handleError);
  }

  // POST /users/:id/recipes
  public createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.authTokenService.post('/users/' + this.userID + '/recipes', recipe)
    .map(
      res => {
        let recipe: Recipe;
        recipe = this.jsonConvert.deserialize(res.json(), Recipe);
        return recipe;
      }
    ).catch(this.handleError);
  }

  // PUT /users/:user_id/recipes/:id
  // id is not yet an attribute of recipe model
  // public updateRecipe(recipe: Recipe): Observable<Recipe> {
  //   return this.authTokenService.put('/users/' + this.userID + '/recipes/' + recipe.id, recipe).map(
  //     res => {
  //       return new Recipe(res.json());
  //     }
  //   ).catch(this.handleError);
  // }

  // DELETE /recipes/:id
  public deleteRecipe(recipeID: number): Observable<null> {
    return this.authTokenService.delete('/recipes/' + recipeID)
    .map(res => null)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('RecipeService::handleError', error);
    return Observable.throw(error);
  }
}


