// services/ingredient.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { IngredientCategory } from '../models/IngredientCategory';
import { Ingredient } from '../models/Ingredient';


@Injectable()
export class IngredientService {

  private userID: number;
  private retries = 3;

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('IngredientService constructed:');
    this.userID = this.authService.getUser().id;
  }

  // GET /ingredients <-- get all ingredients
  public getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>('/ingredients')
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // GET /ingredient_categories/:ingredient_category_id/ingredients
  public getCategoryIngredients(categoryID: number): Observable<IngredientCategory[]> {
    return this.http
      .get<IngredientCategory[]>(`/ingredient_categories/${categoryID}/ingredients`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // POST /ingredient_categories/:ingredient_category_id/ingredients
  public createIngredient(categoryID: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`/ingredient_categories/${categoryID}/ingredients`, ingredient)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // GET /ingredient_categories
  public getAllIngredientCategories(): Observable<IngredientCategory[]> {
    return this.http.get<IngredientCategory[]>('/ingredient_categories')
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // POST /ingredient_categories
  public createIngredientCategory(category: IngredientCategory): Observable<IngredientCategory> {
    return this.http.post<IngredientCategory>('ingredient_categories', category)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // GET /ingredient_categories/:id
  public getIngredientCategoryById(categoryID: number): Observable<IngredientCategory> {
    return this.http.get<IngredientCategory>(`ingredient_categories/${categoryID}`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }
  // PUT /ingredient_categories/:id
  public updateIngredientCategory(category: IngredientCategory): Observable<IngredientCategory> {
    return this.http.put<IngredientCategory>(`/ingredient_categories/${category.id}`, category)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // DELETE /ingredient_categories/:id
  public deleteIngredientCategory(categoryID: number): Observable<null> {
    return this.http.delete<null>(`/ingredient_categories/${categoryID}`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // GET /ingredients/:id
  public getIngredientById(ingredientID: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`/ingredients/${ingredientID}`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // PUT /ingredients/:id
  public updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`/ingredients/${ingredient.id}`, ingredient)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // DELETE /ingredients/:id
  public deleteIngredient(ingredientID: number): Observable<null> {
    return this.http.delete<null>(`/ingredients/${ingredientID}`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  private handleError (error: HttpErrorResponse | any) {
    console.error('IngredientService::handleError', error);
    return throwError(error);
  }
}
