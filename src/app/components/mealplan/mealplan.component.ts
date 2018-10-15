import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';

import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder,
         FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

// import { AuthService } from '../../services/auth.service';
// import { AngularTokenService } from 'angular-token';

import { MealPlanService } from '../../services/meal-plan.service';

import { appConfig } from '../../app.constants';
import { TitleCasePipe } from '../../pipes/title-case.pipe';

import { MealPlan } from '../../models/MealPlan';
import { MealPlanRecipe } from '../../models/MealPlanRecipe';

import { MealplanDialogComponent } from '../mealplan-dialog/mealplan-dialog.component';
import { MealPlanValidator } from '../../validators/mealplan-validator.validator';


@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css'],
})
export class MealplanComponent implements OnInit {

  meal_plans: MealPlan [];
  selected_mp: MealPlan;
  showExtended: true;

  constants = appConfig;
  mpForm: FormGroup;

  constructor(private mealPlanService: MealPlanService,
              public dialog: MatDialog,
              public mpVal: MealPlanValidator) { }


  /*
   * trigger actions on 'init' hook
   */

  ngOnInit() {
    this.mpForm = new FormGroup({
       new_mealplan: new FormControl('', null, this.mpVal.ValidateMealPlan.bind(this))
    });
    this.getMealPlans();
  }

  /*
   * gets all meal plans for the current user
   */

  getMealPlans() {
    this.mealPlanService.getUserMealPlans().subscribe(
      data => {
        this.meal_plans = data;
        if (this.meal_plans) {
          this.selected_mp = this.meal_plans[0];
        }
      });
  }

  /*
   * display meals for a particular day
   */

  private findMealsForDay(meal_plan: MealPlan, day: string) {

    const day_meals = new Array<MealPlanRecipe>();
    meal_plan.meal_plan_recipes_attributes.forEach( (mpr) => {
      if (mpr.day === day) {
        day_meals.push(mpr);
      }

      return day_meals;
    });

    return day_meals.sort( (a, b) => {
      const meal1 = this.constants.mealPlanMeals.indexOf( a.meal.toLowerCase() );
      const meal2 = this.constants.mealPlanMeals.indexOf( b.meal.toLowerCase() );

      if ( meal1 < meal2 ) {
        return -1;
      } else if ( meal1 > meal2 ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  /*
   * delete a meal from a meal plan
   */

  deleteMeal(mp: MealPlan, del_mpr: MealPlanRecipe) {

    const destroy = 1;

    // attempt to add a meal to meal_plan; on failure, remove it
    this.mealPlanService.deleteMeal(mp, del_mpr).subscribe( data => {
      if (data.status === 204) {
        this.selected_mp.meal_plan_recipes_attributes =
          this.selected_mp.meal_plan_recipes_attributes.filter( mpr => mpr.id !== del_mpr.id );
      }
    });

  }

  /*
   * delete an entire meal plan
   */

  deleteMealPlan(meal_plan: MealPlan) {

    this.mealPlanService.deleteMealPlan(meal_plan).subscribe( data => {
      if (data.status && data.status < 300) {
        this.meal_plans = this.meal_plans.filter( mp => mp.id !== meal_plan.id);
        // reset selected meal plan, if it exists
        if ( this.meal_plans.length > 0) {
          this.selected_mp = this.meal_plans[0];
        } else {
          this.selected_mp = null;
        }
      }
    });

  }

  /*
   * create a new (blank) meal plan
   */

  addMealPlan(mpForm: FormGroup) {

    const new_meal_plan = new MealPlan();
    new_meal_plan.name = mpForm.controls.new_mealplan.value;

    this.mealPlanService.createMealPlan(new_meal_plan).subscribe( mp => {
      this.meal_plans.push(mp);
      if (this.meal_plans.length === 1) {
        this.selected_mp = this.meal_plans[0];
      }
    });

    mpForm.reset();

  }

  /*
   * select a meal plan from the list of available meal plans
   */

  private selectMealPlan(meal_plan) {

    // get any new data for this meal plan
    this.mealPlanService.getUserMealPlanById(meal_plan.id).subscribe( mp => {
      this.selected_mp = mp;
    });

  }

  /*
   * open add meal dialog
   */

  openDialog(mp: MealPlan, current_day: string): void {
    const dialogRef = this.dialog.open(MealplanDialogComponent, {
      width: '350px',
      data: { meal_plan: mp, day: current_day }
    });

    dialogRef.afterClosed().subscribe(result => {

      const new_mpr = new MealPlanRecipe();

      new_mpr.day = current_day;
      new_mpr.meal = result.meal;
      new_mpr.recipe_id = result.recipe_id;

      this.addMealToMealPlan(this.selected_mp, new_mpr);
    });

  }

  /*
   * add a specific meal to a meal plan
   */

  addMealToMealPlan(meal_plan: MealPlan, new_mpr: MealPlanRecipe) {

    // attempt to add a meal to meal_plan; on failure, remove it
    this.mealPlanService.updateMealPlan(meal_plan, new_mpr).subscribe( data => {
      if (data.status < 300) {
        // GET for updated resource
        this.mealPlanService.getUserMealPlans().subscribe( mp_data => {
          this.selected_mp = mp_data.find( mp => mp.id === this.selected_mp.id);
        });
      }
    });

  }

  /*
   * checks if any meals can be added to the meal plan for the current day
   * returns false if not
   */

  areMealsLeft(day) {
    const day_meals = this.findMealsForDay(this.selected_mp, day);
    return day_meals.length < this.constants.mealPlanMeals.length;
  }

}
