import { Component, OnInit, EventEmitter, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule, } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { appConfig } from '../../app.constants';

import {MealPlan} from '../../models/MealPlan';
import { ShoppinglistComponent } from '../shoppinglist/shoppinglist.component';

import {ValidateMealPlanName} from '../../validators/mealplan-name-validator';

import {TitleCasePipe} from '../../pipes/title-case.pipe';

import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingList } from '../../models/ShoppingList';
import { MealplanDialogComponent } from '../mealplan-dialog/mealplan-dialog.component';
import { MealPlanService } from '../../services/meal-plan.service';

import { ShoppingListValidator } from '../../validators/shopping-list-validator.validator';

@Component({
  selector: 'app-shoppinglist-dialog',
  templateUrl: './shoppinglist-dialog.component.html',
  styleUrls: ['./shoppinglist-dialog.component.css']
})
export class ShoppinglistDialogComponent implements OnInit {

  private constants = appConfig;

  @ViewChild(MatAutocompleteTrigger) trigger;

  shopping_list: FormGroup;
  meal_plans = Array<MealPlan>();
  filteredMealPlans: Observable<MealPlan[]>;

  constructor( public dialogRef: MatDialogRef<MealplanDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public mealPlanService: MealPlanService,
               public slVal: ShoppingListValidator ) { }

  ngOnInit() {
    // create form group
    this.shopping_list = new FormGroup({
      name: new FormControl('', [Validators.required], this.slVal.ValidateShoppingList.bind(this.slVal)),
      meal_plan: new FormControl('', [Validators.required, ValidateMealPlanName])
    });

    // get a list of the user's meal plans
    this.mealPlanService.getUserMealPlans().subscribe( data => {
      this.meal_plans = data;

      this.filteredMealPlans = this.shopping_list.controls.meal_plan.valueChanges.pipe(
        startWith<string | MealPlan>(''),
        map( value => typeof value === 'string' ? value : value.name ),
        map( name => name ? this.filter(name) : this.meal_plans.slice() )
      );

    });

  }

  /*
   * autocomplete filter for entering an associated meal plan to build shopping list from
   */

  filter(entry: string): MealPlan[] {
    return this.meal_plans.filter( mp => mp.name.toLowerCase().includes(entry.toLowerCase()));
  }

  /*
   * close dialog box (on cancal)
   */

  onClose() {
    this.dialogRef.close();
  }

  /*
   * submit dialog data (on accept)
   */

  onSubmit() {
    const data = {
      meal_plan: this.shopping_list.controls.meal_plan.value,
      name: this.shopping_list.controls.name.value
    };
    this.dialogRef.close(data);
  }

  /*
   * indicate how each meal plan autocomplete item should be displayed
   */

  displayFunc(meal_plan?: MealPlan): string | undefined {
    const titleCasePipe = new TitleCasePipe();
    return meal_plan ? titleCasePipe.transform(meal_plan.name) : undefined;
  }

  /*
   * forcing user to choose from the list of meal plans
   * adapted from: https://github.com/angular/material2/issues/3334
   */

  AfterViewInit() {
    this.trigger.panelClosingActions
    .subscribe(event => {
      if (!(event && event.source)) {
        this.shopping_list.controls.meal_plan.setValue('');
        this.trigger.closePanel();
      }
    });
  }

}
