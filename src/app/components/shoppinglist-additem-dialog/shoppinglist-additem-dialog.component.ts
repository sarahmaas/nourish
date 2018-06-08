import { Component, OnInit, EventEmitter, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule, } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { appConfig } from '../../app.constants';

import { Measure } from '../../models/Measure';
import { MealPlan } from '../../models/MealPlan';
import { Ingredient } from '../../models/Ingredient';
import { ShoppinglistComponent } from '../shoppinglist/shoppinglist.component';

import {ValidateMealPlanName} from '../../validators/mealplan-name-validator';

import {TitleCasePipe} from '../../pipes/title-case.pipe';

import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingList } from '../../models/ShoppingList';
import { IngredientShoppingList } from '../../models/IngredientShoppingList';

import { MealplanDialogComponent } from '../mealplan-dialog/mealplan-dialog.component';

import { MealPlanService } from '../../services/meal-plan.service';
import { IngredientService } from '../../services/ingredient.service';
import { MeasureService } from '../../services/measure.service';

@Component({
  selector: 'app-shoppinglist-additem-dialog',
  templateUrl: './shoppinglist-additem-dialog.component.html',
  styleUrls: ['./shoppinglist-additem-dialog.component.css']
})
export class ShoppinglistAdditemDialogComponent implements OnInit {

  list_item: FormGroup;
  filteredMeasures: Observable<Measure[]>;
  filteredIngredients: Observable<Ingredient[]>;

  valid_ingredients: Ingredient [];
  valid_measures: Measure [];

  @ViewChild(MatAutocompleteTrigger) trigger;

  constructor(public dialogRef: MatDialogRef<ShoppinglistAdditemDialogComponent>,
              public ingredientService: IngredientService,
              @Inject(MAT_DIALOG_DATA) public data: ShoppingList,
              public measureService: MeasureService ) {}

  /*
   * init function: setup / collect necessary data from API, create form controls
   */

  ngOnInit() {

    // create our form group
    this.list_item = new FormGroup({
      ingredient: new FormControl('', [Validators.required]),
      measure: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(9999)])
    });

    // fetch / initialize list of valid measures + ingredients
    this.getIngredientOptions();
    this.getMeasureOptions();

  }

  /*
   * look through the shopping list passed into dialog,
   * and remove ingredients contained in that shopping list from
   * available options.
   */

  getIngredientOptions() {

    // make a list of ingredients already in our shopping list
    const list_items = this.data.ingredient_shopping_lists_attributes;
    const taken_ingredients = new Array<Ingredient>();

    list_items.forEach( item => {
      taken_ingredients.push(item.ingredient);
    });

    // filter out ingredients that are already in the shopping list:
    this.ingredientService.getAllIngredients().subscribe( data => {
      this.valid_ingredients = data.filter( ing => {
        // filter by ingredients not in taken ingredients
        return taken_ingredients.find( taken => taken.id === ing.id ) === undefined;
      });

      this.setupIngredientFilter();

    });

  }

  /*
   * get list of measures to add to our form
   */

  getMeasureOptions() {

    this.measureService.getAllMeasures().subscribe( data => {
      this.valid_measures = data;
      this.setupMeasureFilter();
    });

  }

  /*
   * setup ingredient filter
   */

  setupIngredientFilter() {

    this.filteredIngredients = this.list_item.controls.ingredient.valueChanges.pipe(
      startWith<string | Ingredient>(''),
      map( value => typeof value === 'string' ? value : value.name),
      map( name => name ? this.filterIngredients(name) : this.valid_ingredients.slice() )
    );

  }

  /*
   * setup measures filter
   */

  setupMeasureFilter() {

    this.filteredMeasures = this.list_item.controls.measure.valueChanges.pipe(
      startWith<string | Measure>(''),
      map( value => typeof value === 'string' ? value : value.name),
      map( name => name ? this.filterMeasures(name) : this.valid_measures.slice() )
    );

  }

  /*
   * ingredient filtering function (for autocomplete)
   */

  filterIngredients(entry: string) {
    return this.valid_ingredients.filter( ing => ing.name.toLowerCase().includes(entry.toLowerCase()));
  }

  /*
   * measure filtering function (for autocomplete)
   */

  filterMeasures(entry: string) {
    return this.valid_measures.filter( meas => meas.name.toLowerCase().includes(entry.toLowerCase()));
  }

  /*
   * indicate how each ingredient autocomplete item should be displayed
   */

  ingredientDisplayFunc(ingredient?: Ingredient): string | undefined {
    const titleCasePipe = new TitleCasePipe();
    return ingredient ? titleCasePipe.transform(ingredient.name) : undefined;
  }

  /*
   * indicate how each measure autocomplete item should be displayed
   */

  measureDisplayFunc(measure?: Measure): string | undefined {
    const titleCasePipe = new TitleCasePipe();
    return measure ? titleCasePipe.transform(measure.name) : undefined;
  }

  /*
   * close form: cancel / do not save data
   */

  closeDialog() {
    this.dialogRef.close();
  }

  /*
   * form submit: save data
   */

  onSubmit() {

    const data = {
      ingredient: this.list_item.controls.ingredient.value,
      measure: this.list_item.controls.measure.value,
      amount: this.list_item.controls.amount.value
    };
    this.dialogRef.close(data);

  }

  /*
   * forcing user to choose from the list of ingredients + measures
   * adapted from: https://github.com/angular/material2/issues/3334
   */

  AfterViewInit() {
    this.trigger.panelClosingActions
    .subscribe(event => {

      if (!(event && event.source) ) {
          this.list_item.controls.measure.setValue('');
          this.trigger.closePanel();
        }
    });
  }


}
