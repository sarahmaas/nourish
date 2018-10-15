import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

import { ShoppingList } from '../models/ShoppingList';
import { IngredientShoppingList } from '../models/IngredientShoppingList';

@Injectable()
export class ShoppingListService {

  private userID: number;
  private retries = 3;

  constructor(private http: HttpClient, private authService: AuthService) {
    // this.userID = this.authService.getUser().id;
  }

  /*
   * GET /users/:id/shopping_lists
   */

  public getUserShoppingLists(): Observable<ShoppingList[]> {

    console.log('outside');

    if ( this.authService.getUser() != null) {

      console.log('inside if');

      const userID = this.authService.getUser().id;
      return this.http.get<ShoppingList[]>(`/users/${userID}/shopping_lists`)
        .pipe(retry(this.retries), catchError(this.handleError));

    }
    // } else { // TODO: fix me, incompatible type
    //   return of([]);  // blank observable
    // }

  }

  /*
   * GET /shopping_lists/:id
   */

  public getShoppingListByID(shoppingListID: number): Observable<ShoppingList> {

    return this.http.get<ShoppingList>(`shopping_lists/${shoppingListID}`)
      .pipe(retry(this.retries), catchError(this.handleError));

  }

  /*
   * POST /users/:id/shopping_lists/
   */

  public createShoppingList(input_list: ShoppingList): Observable<ShoppingList> {

    // create object to match format
    const shopping_list = {
      name: input_list.name,
      meal_plan_id: input_list.meal_plan.id
    };

    console.log(shopping_list);

    if ( this.authService.getUser() != null) {

      const userID = this.authService.getUser().id;
      return this.http.post<ShoppingList>(`/users/${userID}/shopping_lists/`,
                                        shopping_list)
      .pipe(retry(this.retries), catchError(this.handleError));
    }
    // } else { // TODO fix me, incompatible type
    //   return of([]);  // blank observable
    // }
  }

  // PUT /shopping_lists/:id

  /*
   * add ingredient to shopping list
   */

  public addIngredientToShoppingList(existing_list: ShoppingList,
                                     list_item: IngredientShoppingList): Observable<HttpResponse<ShoppingList>> {

    // manually build our request to ensure that it's consistent with API needs
    const shopping_list = { shopping_list: {
      ingredient_shopping_lists_attributes: [{
          ingredient_id: list_item.ingredient.id,
          measure_id: list_item.measure.id,
          amount: list_item.amount,
     //     purchased: false
        }]
      }
    };

    console.log(shopping_list);

    // fetch user ID, make request
    const userID = this.authService.getUser().id;
    return this.http.put<HttpResponse<ShoppingList>>(`shopping_lists/${existing_list.id}`,
                                     shopping_list)
    .pipe(retry(this.retries), catchError(this.handleError));

  }

  /*
   * mark ingredient as purchased
   */

  markItemAsPurchased( existing_list_id: number,
                       list_item_id: number ) {

    // build our shopping list request manually, setting ID and purchased
    const shopping_list = {
      shopping_list: {
        ingredient_shopping_lists_attributes: [{
          id: list_item_id,
          purchased: true,
        }]
      }
    };

    console.log(shopping_list);
    return this.updateListItem(existing_list_id, shopping_list);
  }

  /*
   * update ingredient amount
   */

  updateIngredientAmount( existing_list_id: number,
                          list_item_id: number,
                          amount: number ) {

    // build our shopping list request manually, setting ID and purchased
    const shopping_list = {
      shopping_list: {
        ingredient_shopping_lists_attributes: [{
          id: list_item_id,
          amount: amount,
        }]
      }
    };

    console.log(shopping_list);

    return this.updateListItem(existing_list_id, shopping_list);

  }

  /*
   * delete ingredient from the list
   */

  deleteIngredient( existing_list_id: number,
                    list_item_id: number ) {

    // build our shopping list request manually, setting ID and purchased
    const shopping_list = {
      shopping_list: {
        ingredient_shopping_lists_attributes: [{
          id: list_item_id,
          _destroy: true,
        }]
      }
    };

    return this.updateListItem(existing_list_id, shopping_list);

  }

  /*
   * update list item
   */

  private updateListItem(list_id: number, list_request: any): Observable<HttpResponse<ShoppingList>> {
    // send request, get response
    return this.http.put<HttpResponse<ShoppingList>>(`shopping_lists/${list_id}`,
                                     list_request)
    .pipe(retry(this.retries), catchError(this.handleError));

  }

  /*
   * delete a shopping list wholesale
   */

  public deleteShoppingList(shoppingListID: number): Observable<HttpResponse<ShoppingList>> {

    return this.http.delete<HttpResponse<ShoppingList>>(`shopping_lists/${shoppingListID}`)
    .pipe(retry(this.retries), catchError(this.handleError));

  }

  /*
   * error handling function for Shopping List service
   */

  private handleError (error: HttpErrorResponse | any) {
    console.error('ShoppingListService::handleError', error);
    return throwError(error);
  }

}
