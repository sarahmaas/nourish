import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { MealPlan } from '../models/MealPlan';
import { MealPlanRecipe } from '../models/MealPlanRecipe';

@Injectable()
export class MealPlanService implements OnInit {

  userID: number;
  private retries = 3;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userID = this.authService.getUser().id;
  }

  ngOnInit() { }

  // GET /users/:id/meal_plans
  public getUserMealPlans(): Observable<MealPlan[]> {
    return this.http.get<MealPlan[]>(`users/${this.userID}/meal_plans`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  // GET /meal_plans/:id
  public getUserMealPlanById(mealPlanID: number): Observable<MealPlan> {

    return this.http.get<MealPlan>(`meal_plans/${mealPlanID}`)
    .pipe(retry(this.retries), catchError(this.handleError));
  }

  // POST /users/:id/meal_plans
  public createMealPlan(meal_plan: MealPlan): Observable<MealPlan> {
    return this.http.post<MealPlan>(`/users/${this.userID}/meal_plans/`,
                                      meal_plan)
    .pipe(retry(this.retries), catchError(this.handleError));
  }

  /*
   * PUT routes
   */

  public deleteMeal(req_mp: MealPlan, meal_plan_recipe: MealPlanRecipe): Observable<HttpResponse<MealPlan>> {

    const meal_plan = { meal_plan: { meal_plan_recipes_attributes: [{
                                        id: meal_plan_recipe.id,
                                        _destroy: 1 }] }};

    return this.http.put<HttpResponse<MealPlan>>(`meal_plans/${req_mp.id}`, meal_plan)
      .pipe(retry(this.retries), catchError(this.handleError));

  }

  public updateMealPlan(req_mp: MealPlan, meal_plan_recipe: MealPlanRecipe): Observable<any> {

    const meal_plan = { meal_plan: {  meal_plan_recipes_attributes: [ {
                                      day: meal_plan_recipe.day,
                                      meal: meal_plan_recipe.meal,
                                      recipe_id: meal_plan_recipe.recipe_id } ] }};

    return this.http.put(`meal_plans/${req_mp.id}`, meal_plan)
      .pipe(retry(this.retries), catchError(this.handleError));
  }


  // DELETE /meal_plan/:id
  public deleteMealPlan(meal_plan: MealPlan): Observable<any> {
    return this.http.delete(`/meal_plans/${meal_plan.id}`)
      .pipe(retry(this.retries), catchError(this.handleError));
  }

  private handleError (error: HttpErrorResponse | any) {
    console.error('MealPlanService::handleError', error);
    return throwError(error);
  }

}
