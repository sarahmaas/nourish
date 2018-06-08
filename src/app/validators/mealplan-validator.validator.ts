import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { MealPlanService } from '../services/meal-plan.service';
import { Injectable } from '@angular/core';

  /*
   * custom meal plan validator - checks 'add meal plan' field for duplicate names
   */

@Injectable()
export class MealPlanValidator {

  constructor(public mealPlanService: MealPlanService) {}

 /*
  * check user meal plan against known meal plans, and set 1000ms debounce
  * to prevent slamming our poor API with requests.
  */

  ValidateMealPlan(control: AbstractControl) {

    if (control.value == null) { return new Promise( resolve => resolve(null) ); }

    const promise = new Promise( resolve => {
      setTimeout(() => {
        this.mealPlanService.getUserMealPlans().subscribe( data => {
          if ( data.filter( mp => mp.name.toLowerCase().trim() === control.value.toLowerCase().trim()).length > 0 ) {
            resolve( {'MealPlanTaken': true} );
          } else {
            resolve();
          }
        });
      }, 500);
    });
    return promise;
  }

}
