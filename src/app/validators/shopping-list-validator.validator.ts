import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ShoppingListService } from '../services/shopping-list.service';
import { Injectable } from '@angular/core';

  /*
   * custom shopping list validator - checks 'add shopping list' field for duplicate names
   */

@Injectable()
export class ShoppingListValidator {

  constructor(public shoppingListService: ShoppingListService) {}

 /*
  * check user shopping list against known shopping lists, and set 500ms debounce
  * to prevent slamming our poor API with requests.
  */

  ValidateShoppingList(control: AbstractControl) {

    if (control.value == null) { return new Promise( resolve => resolve(null) ); }

    console.log(this.shoppingListService);
    console.log("filtering...");

    const promise = new Promise( resolve => {
      setTimeout(() => {
        this.shoppingListService.getUserShoppingLists().subscribe( data => {
          if ( data.filter( sl => sl.name.toLowerCase().trim() === control.value.toLowerCase().trim()).length > 0 ) {
            resolve( {'ShoppingListTaken': true} );
          } else {
            resolve();
          }
        });
      }, 500);
    });
    return promise;
  }

}
