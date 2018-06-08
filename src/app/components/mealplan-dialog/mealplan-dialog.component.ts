import { Component, OnInit, EventEmitter, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger, 
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule, } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { RecipeService } from '../../services/recipe.service';

import { appConfig } from '../../app.constants';

import {MealPlan} from '../../models/MealPlan';
import {MealPlanRecipe} from '../../models/MealPlanRecipe';
import {Recipe} from '../../models/Recipe';

import {ValidateRecipe} from '../../validators/recipe-validator.validator';

import {TitleCasePipe} from '../../pipes/title-case.pipe';

import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-mealplan-dialog',
  templateUrl: './mealplan-dialog.component.html',
  styleUrls: ['./mealplan-dialog.component.css']
})
export class MealplanDialogComponent implements OnInit, AfterViewInit {

  private constants = appConfig;

  meal_plan_recipe: FormGroup;

  recipes = Array<Recipe>();
  filteredRecipes: Observable<Recipe[]>;

  @ViewChild(MatAutocompleteTrigger) trigger;

  constructor(public dialogRef: MatDialogRef<MealplanDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public recipeService: RecipeService) {}

  /*
   *  setup form fields + validation, get list of all recipes,
   *  and setup filtering action
   */

  ngOnInit() {

    this.meal_plan_recipe = new FormGroup({
      meal: new FormControl('', [Validators.required]),
      recipe: new FormControl('', [Validators.required, ValidateRecipe])
    });

    /* get recipes, assign to filteredRecipes */

    this.recipeService.getAllRecipes().subscribe( data => {
      this.recipes = data;
      this.filteredRecipes = this.meal_plan_recipe.controls.recipe.valueChanges.pipe(
        startWith<string | Recipe>(''),
        map(value => typeof value === 'string' ? value : value.title),
        map(title => title ? this.filter(title) : this.recipes.slice() )
      );
    });
  }

  /*
   * forcing user to choose from the list of recipes
   * adapted from: https://github.com/angular/material2/issues/3334
   */

  ngAfterViewInit() {
    this.trigger.panelClosingActions
    .subscribe(event => {
      if (!(event && event.source)) {
        this.meal_plan_recipe.controls.recipe.setValue('');
        this.trigger.closePanel();
      }
    });
  }

  /*
   * autocomplete filtering function: look through list of recipes, find all that include entered string
   */

  filter(entry: string): Recipe[] {
    return this.recipes.filter(recipe => recipe.title.toLowerCase().includes(entry.toLowerCase()));
  }

  /*
   * close dialog box
   */

  onClose() {
    this.dialogRef.close();
  }

  /*
   * get available 'mealtimes' (breakfast, lunch, etc.) remaining for the day's meals
   */

  getAvailableMealTimes() {
    const taken_mealtimes = new Set();

    this.data.meal_plan.meal_plan_recipes_attributes.forEach( mpr => {
      if (mpr.day === this.data.day) {
        taken_mealtimes.add(mpr.meal);
      }
    });

    return this.constants.mealPlanMeals.filter( (mealtime) => !taken_mealtimes.has(mealtime) );
  }

  /*
   *  pass data back to parent component, and close
   */

  onSubmit(meal_plan_recipe: FormGroup) {
    const data = {  meal: this.meal_plan_recipe.controls.meal.value,
                    recipe_id: this.meal_plan_recipe.controls.recipe.value.id };
    this.dialogRef.close(data);
  }

  /*
   * indicate how each recipe autocomplete item should be displayed
   */

  displayFunc(recipe?: Recipe): string | undefined {
    const titleCasePipe = new TitleCasePipe();
    return recipe ? titleCasePipe.transform(recipe.title) : undefined;
  }

}

