import { Injectable, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './auth.service';
import { ShoppingList } from '../models/ShoppingList';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { IngredientShoppingList } from '../models/IngredientShoppingList';

@Injectable()
export class ShoppingListService {

  private userID: number;
  private jsonConvert: JsonConvert;

  constructor(private authTokenService: Angular2TokenService) {
 //   this.userID = this.authTokenService.currentUserData.id;
    this.jsonConvert = new JsonConvert();
  }

  /*
   * GET /users/:id/shopping_lists
   */

  public getUserShoppingLists(): Observable<ShoppingList[]> {

    console.log('outside');

    if ( this.authTokenService.currentUserData != null) {

      console.log('inside if');

      const userID = this.authTokenService.currentUserData.id;
      return this.authTokenService.get('/users/' + userID + '/shopping_lists')
      .map( res => {
        console.log('result');
        console.log(res);
        return this.jsonConvert.deserialize(res.json(), ShoppingList);
      }).catch(this.handleError);

    } else {
      return of([]);  // blank observable
    }

  }

  /*
   * GET /shopping_lists/:id
   */

  public getShoppingListByID(shoppingListID: number) {

    return this.authTokenService.get('shopping_lists/' + shoppingListID).map( res => {
      return this.jsonConvert.deserialize(res.json(), ShoppingList);
    }).catch(this.handleError);

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

    if ( this.authTokenService.currentUserData != null) {

      const userID = this.authTokenService.currentUserData.id;
      return this.authTokenService.post('/users/' +
                                        userID +
                                        '/shopping_lists/',
                                        shopping_list)
      .map( res => {
        console.log(res.json());
        return this.jsonConvert.deserialize(res.json(), ShoppingList);
      }).catch(this.handleError);
    } else {
      return of();  // blank observable
    }
  }

  // PUT /shopping_lists/:id

  /*
   * add ingredient to shopping list
   */

  public addIngredientToShoppingList(existing_list: ShoppingList,
                                     list_item: IngredientShoppingList) {

    // manually build our request to ensure that it's consistent with API needs
    const shopping_list = { shopping_list: {
      ingredient_shopping_lists_attributes: [{
          ingredient_id: list_item.ingredient._id,
          measure_id: list_item.measure._id,
          amount: list_item.amount,
     //     purchased: false
        }]
      }
    };

    console.log(shopping_list);

    // fetch user ID, make request
    const userID = this.authTokenService.currentUserData.id;
    return this.authTokenService.put('shopping_lists/' + existing_list.id,
                                     shopping_list)
    .map( res => {
      console.log(res.json());
      if (res && res.status < 300) {
        return {status: res.status, json: res};
      }
    }).catch(this.handleError);

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

  private updateListItem(list_id: number, list_request: any) {
    // send request, get response
    return this.authTokenService.put('shopping_lists/' +
                                     list_id,
                                     list_request)
    .map( res => {
      console.log(res);
      if (res && res.status < 300) {
        console.log('returned from updatelistitem');
        return { status: res.status, json: res };
      }
    }).catch(this.handleError);

  }

  /*
   * delete a shopping list wholesale
   */

  public deleteShoppingList(shoppingListID: number) {

    return this.authTokenService.delete('shopping_lists/' + shoppingListID)
    .map ( res => {
      if (res && res.status < 300) {
        console.log(res.json());
        return {status: res.status, json: res};
      }
    }).catch(this.handleError);

  }

  /*
   * error handling function for Shopping List service
   */

  private handleError (error: Response | any) {
    console.error('ShoppingListService::handleError', error);
    return Observable.throw(error);
  }

}
