import { Component, OnInit, EventEmitter, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { MeasureService } from '../../services/measure.service';
import { IngredientService } from '../../services/ingredient.service';

import { Recipe } from '../../models/Recipe';
import { Measure } from '../../models/Measure';
import { Ingredient } from '../../models/Ingredient';
import { IngredientRecipe } from '../../models/IngredientRecipe';

import { TitleCasePipe } from '../../pipes/title-case.pipe';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipeform-dialog',
  templateUrl: './recipeform-dialog.component.html',
  styleUrls: ['./recipeform-dialog.component.css']
})
export class RecipeformDialogComponent implements OnInit, AfterViewInit {
  recipe_ingredient: FormGroup;
  measures: Measure[];
  filteredMeasures: Observable<Measure[]>;
  ingredients: Ingredient[];
  filteredIngredients: Observable<Ingredient[]>;

  @ViewChild(MatAutocompleteTrigger) trigger;

  constructor(public dialogRef: MatDialogRef<RecipeformDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ingredientService: IngredientService, public measureService: MeasureService) {}

  ngOnInit() {
    this.recipe_ingredient = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(9999)]),
      measure: new FormControl('', [Validators.required]),
      ingredient: new FormControl('', [Validators.required])
    });
    this.getMeasures();
    this.getIngredients();
  }

  /*
  * forcing user to choose from the list of recipes
  * adapted from: https://github.com/angular/material2/issues/3334
  */

  ngAfterViewInit() {
    this.trigger.panelClosingActions
    .subscribe(event => {
      if (!(event && event.source)) {
        this.recipe_ingredient.controls.recipe.setValue('');
        this.trigger.closePanel();
      }
    });
  }

  /*
   * autocomplete filtering function: look through list of ingredients, find all that include entered string
   */

  filterIngredients(entry: string): Ingredient[] {
    return this.ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(entry.toLowerCase()));
  }

  /*
   * autocomplete filtering function: look through list of measures, find all that include entered string
   */

  filterMeasures(entry: string): Measure[] {
    return this.measures.filter(measure => measure.name.toLowerCase().includes(entry.toLowerCase()));
  }

  /*
   * close dialog box
   */

  onClose() {
    this.dialogRef.close();
  }

  /*
   *  pass data back to parent component, and close
   */

  onSubmit() {
    const data = {
      amount: this.recipe_ingredient.controls.amount.value,
      measure: this.recipe_ingredient.controls.measure.value,
      ingredient: this.recipe_ingredient.controls.ingredient.value
    };
    this.dialogRef.close(data);
  }

  /*
   * indicate how each ingredient autocomplete item should be displayed
   */

  displayIngredients(ingredient?: Ingredient): string | undefined {
    const titleCasePipe = new TitleCasePipe();
    return ingredient ? titleCasePipe.transform(ingredient.name) : undefined;
  }

  /*
   * indicate how each measure autocomplete item should be displayed
   */

  displayMeasures(measure?: Measure): string | undefined {
    const titleCasePipe = new TitleCasePipe();
    return measure ? titleCasePipe.transform(measure.name) : undefined;
  }

  getIngredients() {
    this.ingredientService.getAllIngredients().subscribe(
      data => {
        console.log('Ingredient Service data');
        console.log(data);
        this.ingredients = data;
        console.log(this.ingredients);
        this.filteredIngredients = this.recipe_ingredient.controls.ingredient.valueChanges
        .pipe(
          startWith<string | Ingredient>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterIngredients(name) : this.ingredients.slice() )
        );
      }
    );
  }

  getMeasures() {
    this.measureService.getAllMeasures().subscribe(
      data => {
        console.log('Measure Service data');
        console.log(data);
        this.measures = data;
        console.log(this.measures);
        this.filteredMeasures = this.recipe_ingredient.controls.measure.valueChanges
        .pipe(
          startWith<string | Measure>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filterMeasures(name) : this.measures.slice() )
        );
      }
    );
  }
}
