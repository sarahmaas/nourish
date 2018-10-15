// https://material.angular.io/components/autocomplete/examples
// for use in recipe form builder

import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { TitleCasePipe } from '../../pipes/title-case.pipe';

import { Ingredient } from '../../models/Ingredient';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-select-ingredient',
  templateUrl: './select-ingredient.component.html',
  styleUrls: ['./select-ingredient.component.css']
})
export class SelectIngredientComponent implements OnInit {
  ingredientCtrl: FormControl;
  private ingredients: Ingredient[];
  filteredIngredients: Observable<Ingredient[]>;

  constructor(public ingredientService: IngredientService) {
  }

  ngOnInit() {
    this.ingredientCtrl = new FormControl();
    this.getIngredients();
  }

  getIngredients() {
    this.ingredientService.getAllIngredients().subscribe(
      data => {
        console.log('Ingredient Service data');
        console.log(data);
        this.ingredients = data;
        console.log(this.ingredients);
        this.filteredIngredients = this.ingredientCtrl.valueChanges
        .pipe(
          startWith(''),
          map(ingredient => ingredient ? this.filterIngredients(ingredient) : this.ingredients.slice())
        );
      }
    );
  }

  filterIngredients(name: string) {
    return this.ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayIngredients(ingredient?: Ingredient): string | undefined {
    const titleCasePipe = new TitleCasePipe();
    return ingredient ? titleCasePipe.transform(ingredient.name) : undefined;
  }
}
