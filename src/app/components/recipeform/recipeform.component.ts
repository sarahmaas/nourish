import { Component, OnInit, EventEmitter, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, ReactiveFormsModule, FormControl, FormGroupDirective } from '@angular/forms';
import { MatSelectModule, MatInputModule, MatFormField, MatAutocompleteModule,
         MatAutocompleteTrigger, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { IngredientService } from '../../services/ingredient.service';
import { DietaryRestrictionService } from '../../services/dietary-restriction.service';
import { RecipeService } from '../../services/recipe.service';

import { Recipe } from '../../models/Recipe';
import { Measure } from '../../models/Measure';
import { Ingredient } from '../../models/Ingredient';
import { DietaryRestriction } from '../../models/DietaryRestriction';
import { IngredientRecipe } from '../../models/IngredientRecipe';

import { RecipeformDialogComponent } from '../recipeform-dialog/recipeform-dialog.component';
import { MeasureService } from '../../services/measure.service';
import { TitleCasePipe } from '@angular/common';
import { DietaryRestrictionRecipe } from '../../models/DietaryRestrictionRecipe';

import { RecipeNameValidator } from '../../validators/recipe-name-validator.validator';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.css']
})
export class RecipeformComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger) trigger;

  recipe: Recipe;
  recipeForm: FormGroup;
  addIngredientForm: FormGroup;
  available_ingredients: Ingredient[];
  measures: Measure[];
  restrictions: DietaryRestriction[];

  filteredIngredients: Observable<Ingredient[]>;
  filteredMeasures: Observable<Measure[]>;

  constructor( private ingredientService: IngredientService,
               private restrictionService: DietaryRestrictionService,
               private recipeService: RecipeService,
               private measureService: MeasureService,
               public dialog: MatDialog,
               private router: Router,
               private recVal: RecipeNameValidator ) {

  }

  /*
   * init: setup form controls
   */

  ngOnInit() {

    this.recipe = new Recipe();
    this.recipe.ingredient_recipes_attributes = new Array<IngredientRecipe>();
    this.recipe.dietary_restriction_recipes_attributes = new Array<DietaryRestrictionRecipe>();

    this.recipeForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)], this.recVal.ValidateRecipeName.bind(this.recVal)),
      summary: new FormControl('', [Validators.required]),
      servings: new FormControl('', [Validators.required, Validators.min(1), Validators.max(32)]),
      instructions: new FormControl('', [Validators.required]),
      dietary_restrictions: new FormControl()
    });

    this.addIngredientForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(0.0001), Validators.max(9999)]),
      ingredient: new FormControl('', [Validators.required]),
      measure: new FormControl('', [Validators.required])
    });

    this.getIngredients(this.addIngredientForm);
    this.getMeasures(this.addIngredientForm);
    this.getDietaryRestrictions();

  }

  AfterViewInit() {
    this.trigger.panelClosingActions.subscribe(event => {
      if ( !(event && event.source) ) {
        this.trigger.closePanel();
      }
    });
  }

  /*
   * gets all ingredients
   */

  private getIngredients(addIngredientForm: FormGroup) {

    this.ingredientService.getAllIngredients().subscribe(
      data => {
        this.available_ingredients = data;
        this.setupIngredientFilter(addIngredientForm);
      }
    );

  }

  /*
   * get all available dietary restrictions
   */

  private getDietaryRestrictions() {

    this.restrictionService.getAllDietaryRestrictions()
    .subscribe( data => {
      this.restrictions = data;
    });

  }

  /*
   * get all available units of measure
   * and setup filter for ingredients
   */

  private getMeasures(addIngredientForm: FormGroup) {

    this.measureService.getAllMeasures()
    .subscribe( data => {
      this.measures = data;
      this.setupMeasureFilter(addIngredientForm);
    });

  }

  /*
   * add ingredient for recipe
   */

  addIngredientRecipe(addForm: FormGroup, formDirective: FormGroupDirective) {

    const ingredient_recipe = new IngredientRecipe();
    ingredient_recipe.ingredient = addForm.controls.ingredient.value;
    ingredient_recipe.amount = addForm.controls.amount.value;
    ingredient_recipe.measure = addForm.controls.measure.value;

    // remove ingredient from available ingredients
    this.available_ingredients = this.available_ingredients.filter( ing => {
      return ing.name.toLowerCase() !== ingredient_recipe.ingredient.name.toLowerCase();
    });
    this.recipe.ingredient_recipes_attributes.push(ingredient_recipe);

    this.addIngredientForm.reset();
    formDirective.resetForm();

  }

  /*
   * remove ingredient from recipe
   */

  removeIngredientRecipe(removed_ingredient_recipe: IngredientRecipe) {

    // filter out ingredient-recipe from recipe
    this.recipe.ingredient_recipes_attributes =
      this.recipe.ingredient_recipes_attributes.filter( ing_rec => {
        return ing_rec.ingredient.name !== removed_ingredient_recipe.ingredient.name;
    });

    // add removed ingredient back to our list
    this.available_ingredients.push(removed_ingredient_recipe.ingredient);

  }

  /*
   * display ingredients for autocomplete
   */

  displayIngredient(ingredient?: Ingredient): string | undefined {
    const titleCasePipe = new TitleCasePipe();
    return ingredient ? titleCasePipe.transform(ingredient.name) : undefined;
  }

  /*
   * display measures for autocomplete
   */

  displayMeasure(measure?: Measure): string | undefined {
    return measure ? measure.name : undefined;
  }

  /*
   * setup ingredient filter
   */

  private setupIngredientFilter(form: FormGroup) {

    this.filteredIngredients = form.controls.ingredient.valueChanges.pipe(
      startWith<string | Ingredient>(''),
      map( value => value == null ? '' : value),
      map( value => typeof value === 'string' ? value : value.name),
      map( name => name ? this.filterIngredients(name) : this.available_ingredients.slice() )
    );

  }

  /*
   * setup measures filter
   */

  private setupMeasureFilter(form: FormGroup) {

    this.filteredMeasures = form.controls.measure.valueChanges.pipe(
      startWith<string | Measure>(''),
      map( value => value == null ? '' : value),
      map( value => (typeof value === 'string') ? value : value.name),
      map( name => name ? this.filterMeasures(name) : this.measures.slice() )
    );

  }

  /*
   * ingredient filtering function (for autocomplete)
   */

  private filterIngredients(entry: string) {

    return this.available_ingredients.filter( ing => {
      ing.name.toLowerCase().includes(entry.toLowerCase());
    });

  }

  /*
   * measure filtering function (for autocomplete)
   */

  private filterMeasures(entry: string) {

    return this.measures.filter( meas => {
      meas.name.toLowerCase().includes(entry.toLowerCase());
    });

  }

  /*
   * submit recipe
   */

  onSubmit() {

    this.recipe.title = this.recipeForm.controls.title.value;
    this.recipe.summary = this.recipeForm.controls.summary.value;
    this.recipe.instructions = this.recipeForm.controls.instructions.value;
    this.recipe.servings = this.recipeForm.controls.servings.value;

    // there may not be any dietary restrictions here
    if (this.recipeForm.controls.dietary_restrictions.value) {
      this.recipeForm.controls.dietary_restrictions.value.forEach( data => {
        this.recipe.dietary_restriction_recipes_attributes.push(data);
      });
    }
    this.recipeService.createRecipe(this.recipe).subscribe( res => {
      if (res && res.id) {
        this.router.navigate(['myrecipes']);
      }
    });

  }

}
