import { Injectable, OnInit } from '@angular/core';

import { Http } from '@angular/http';

import { environment } from '../../environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './auth.service';
import { MealPlan } from '../models/MealPlan';

import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { MealPlanRecipe } from '../models/MealPlanRecipe';

@Injectable()
export class MealPlanService implements OnInit {

  private jsonConvert: JsonConvert;
  userID: number;

  constructor(private authTokenService: Angular2TokenService) {
    this.jsonConvert = new JsonConvert();
    this.userID = this.authTokenService.currentUserData.id;
  }

  ngOnInit() { }

  // GET /users/:id/meal_plans
  public getUserMealPlans(): Observable<MealPlan[]> {
    return this.authTokenService.get('users/' + this.userID + '/meal_plans')
    .map( res => {
      return this.jsonConvert.deserialize(res.json(), MealPlan);
    }).catch(this.handleError);
  }

  // GET /meal_plans/:id
  public getUserMealPlanById(mealPlanID: number) {

    return this.authTokenService.get('meal_plans/' +
                                      mealPlanID)
    .map( res => {
      return this.jsonConvert.deserialize(res.json(), MealPlan);
    }).catch(this.handleError);
  }

  // POST /users/:id/meal_plans
  public createMealPlan(meal_plan: MealPlan): Observable<MealPlan> {
    return this.authTokenService.post('/users/' +
                                      this.userID +
                                      '/meal_plans/',
                                      meal_plan)
    .map( res => {
      return this.jsonConvert.deserialize(res.json(), MealPlan);
    }).catch(this.handleError);
  }

  /*
   * PUT routes
   */

  public deleteMeal(req_mp: MealPlan, meal_plan_recipe: MealPlanRecipe) {

    const meal_plan = { meal_plan: { meal_plan_recipes_attributes: [{
                                        id: meal_plan_recipe.id,
                                        _destroy: 1 }] }};

    return this.authTokenService.put('meal_plans/' + req_mp.id, meal_plan)
    .map((res => {
      if (res && res.status < 300) {
        return {status: res.status, json: res};
      }
    })).catch(this.handleError);

  }

  public updateMealPlan(req_mp: MealPlan, meal_plan_recipe: MealPlanRecipe): Observable<any> {

    const meal_plan = { meal_plan: {  meal_plan_recipes_attributes: [ {
                                      day: meal_plan_recipe.day,
                                      meal: meal_plan_recipe.meal,
                                      recipe_id: meal_plan_recipe.recipe_id } ] }};

    return this.authTokenService.put('meal_plans/' + req_mp.id, meal_plan)
    .map((res => {
      if (res && res.status < 300) {
          return {status: res.status, json: res};
        }
    })).catch(this.handleError);
  }


  // DELETE /meal_plan/:id
  public deleteMealPlan(meal_plan: MealPlan): Observable<any> {
    return this.authTokenService.delete('/meal_plans/' + meal_plan.id)
    .map( res => {
      if (res && res.status < 300) {
        return { status: res.status, json: res };
      } else {
        return { status: null, json: null};
      }
    }).catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('MealPlanService::handleError', error);
    return Observable.throw(error);
  }

}


