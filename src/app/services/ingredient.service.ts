//services/ingredient.service.ts

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

import {Angular2TokenService} from "angular2-token";
import {AuthService} from "./auth.service";
import { IngredientCategory } from '../models/IngredientCategory';
import { Ingredient } from '../models/Ingredient';
import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class IngredientService {

  private userID: number;
  private jsonConvert: JsonConvert;

  constructor(private authTokenService: Angular2TokenService, private authService: AuthService) { 
    console.log('IngredientService constructed:');
    console.log(this.authService.getUser());
    console.log(this.authService.getUser().email);  
    this.userID = this.authService.getUser().id;

    this.jsonConvert = new JsonConvert();
//    this.jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
//    this.jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
//    this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null
  }

  // GET /ingredients <-- get all ingredients
  public getAllIngredients(): Observable<Ingredient[]> {
    return this.authTokenService.get('/ingredients').map(
      res => {
        return this.jsonConvert.deserialize(res.json(), Ingredient);
      }
    ).catch(this.handleError);    
  }

  // GET /ingredient_categories/:ingredient_category_id/ingredients
  public getCategoryIngredients(categoryID: number): Observable<IngredientCategory[]> {
    return this.authTokenService
    .get('/ingredient_categories/' + categoryID + '/ingredients').map(
      res => {
        return this.jsonConvert.deserialize(res.json(), IngredientCategory);
      }
    ).catch(this.handleError);
  }  
  
  // POST /ingredient_categories/:ingredient_category_id/ingredients
  public createIngredient(categoryID: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.authTokenService.post('/ingredient_categories/' + categoryID + '/ingredients', ingredient).map(
      res => {
        return this.jsonConvert.deserialize(res.json(), Ingredient)
      }
    ).catch(this.handleError);
  }
  
  // GET /ingredient_categories
  public getAllIngredientCategories(): Observable<IngredientCategory[]> {
    return this.authTokenService.get('/ingredient_categories').map(
      res => {
        return this.jsonConvert.deserialize(res.json(), IngredientCategory);
      }
    ).catch(this.handleError);    
  }

  // POST /ingredient_categories
  public createIngredientCategory(category: IngredientCategory): Observable<IngredientCategory> {
    return this.authTokenService.post('ingredient_categories', category).map(
      res => {
        return this.jsonConvert.deserialize(res.json(), IngredientCategory);
      }
    ).catch(this.handleError);
  }
  
  // GET /ingredient_categories/:id
  public getIngredientCategoryById(categoryID: number): Observable<IngredientCategory> {
    return this.authTokenService.get('ingredient_categories' + categoryID).map( 
      res => {
        return this.jsonConvert.deserialize(res.json(), IngredientCategory);
      }
    ).catch(this.handleError);    
  }  
  // PUT /ingredient_categories/:id
  public updateIngredientCategory(category: IngredientCategory): Observable<IngredientCategory> {
    return this.authTokenService.put('/ingredient_categories/' + category.id, category).map(
      res => {
        return this.jsonConvert.deserialize(res.json(), IngredientCategory);
      }
    ).catch(this.handleError);
  } 
  
  // DELETE /ingredient_categories/:id
  public deleteIngredientCategory(categoryID: number): Observable<null> {
    return this.authTokenService.delete('/ingredient_categories/' + categoryID)
    .map(res => null)
    .catch(this.handleError);
  }
  
  // GET /ingredients/:id
  public getIngredientById(ingredientID: number): Observable<Ingredient> {
    return this.authTokenService.get('/ingredients/' + ingredientID).map(
      res => {
        return this.jsonConvert.deserialize(res.json(), Ingredient);
      }
    ).catch(this.handleError);    
  }

  // PUT /ingredients/:id
  public updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.authTokenService.put('/ingredients/' + ingredient.id, ingredient).map(
      res => {
        return this.jsonConvert.deserialize(res.json(), Ingredient);
      }
    ).catch(this.handleError);
  }

  // DELETE /ingredients/:id
  public deleteIngredient(ingredientID: number): Observable<null> {
    return this.authTokenService.delete('/ingredients/' + ingredientID)
    .map(res => null)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('IngredientService::handleError', error);
    return Observable.throw(error);
  }
}
