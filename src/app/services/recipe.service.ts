// https://www.sitepoint.com/angular-rxjs-create-api-service-rest-backend/

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Recipe } from '../models/Recipe';
import { IngredientRecipe } from '../models/IngredientRecipe';

@Injectable()
export class RecipeService {

  private userID: number;
  private retries = 3;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userID = this.authService.getUser().id;
  }

  /*
   * GET /users/:id/recipes
   */

  public getUserRecipes(userID: number = this.userID): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`users/${userID}/recipes`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

 /*
  * GET /recipes/:id
  */

  public getUserRecipeById(recipeID: number): Observable<Recipe> {
    return this.http.get<Recipe>(`recipes/${recipeID}`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  /*
   * GET /recipes --> gets all recipes
   */

  public getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('recipes')
      .pipe(retry(this.retries), catchError(this.handleError));
  }

 /*
  * POST /users/:id/recipes
  */

  public createRecipe(recipe: Recipe): Observable<Recipe> {

    const recipe_request = this.mapModelToRequest(recipe);

    console.log(recipe_request);
    return this.http.post<Recipe>(`users/${this.userID}/recipes`, recipe_request)
      .pipe(retry(this.retries), catchError(this.handleError));

  }

  /*
   * update recipe based on new parameters
   */

  private updateRecipe(recipe_id: number, recipe_request: any) {

    return this.http.put(`recipes/${recipe_id}`, recipe_request)
      .pipe(retry(this.retries), catchError(this.handleError));

  }

  /*
   * add an ingredient to the recipe
   */

  public addIngredientToRecipe(recipe_id: number, ing_rec: IngredientRecipe) {

    // manually construct request for our API
    const recipe = {
      recipe: {
        ingredient_recipes_attributes: {
          ingredient_id: ing_rec.ingredient.id ,
          amount: ing_rec.amount,
          measure_id: ing_rec.measure.id
        }
      }
    };

    return this.updateRecipe(recipe_id, recipe);

  }

  /*
   * remove an ingredient from the recipe
   */

  public removeIngredientFromRecipe(recipe_id: number, ing_rec: IngredientRecipe) {

    // manually construct request for our API
    const recipe = {
      recipe: {
        ingredient_recipes_attributes: {
          id: ing_rec.id,
          _destroy: true
        }
      }
    };

    return this.updateRecipe(recipe_id, recipe);

  }

 /*
  * DELETE /recipes/:id
  */

  public deleteRecipe(recipeID: number): Observable<null> {
    return this.http.delete<null>(`recipes/${recipeID}`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  /*
   * handle error
   */

  private handleError (error: HttpErrorResponse | any) {
    console.error('RecipeService::handleError', error);
    return throwError(error);
  }

  /*
   * maps a Recipe model to its request equivalent
   */

  private mapModelToRequest(recipe: Recipe): Object {

    const request = {
      recipe: {
        title: recipe.title,
        summary: recipe.summary,
        instructions: recipe.instructions,
        servings: recipe.servings,
        ingredient_recipes_attributes: [],
        dietary_restriction_recipes_attributes: []
      }
    };

    recipe.ingredient_recipes_attributes.forEach( data => {
      request.recipe.ingredient_recipes_attributes.push({ ingredient_id: data.ingredient.id,
                                                          measure_id: data.measure.id,
                                                          amount: data.amount });
    });

    recipe.dietary_restriction_recipes_attributes.forEach( data => {
      console.log(data);
      request.recipe.dietary_restriction_recipes_attributes.push({dietary_restriction_id: data.id} );
    });

    console.log(request);
    return request;

  }
}
