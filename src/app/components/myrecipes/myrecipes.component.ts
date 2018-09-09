import { Component, OnInit } from '@angular/core';

import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/Recipe';

import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.css']
})
export class MyRecipesComponent implements OnInit {

    recipes = [];
    showExtended = true;

    constructor(public authService: AuthService, public recipeService: RecipeService) {
      this.getUserRecipes();
    }

    ngOnInit() {}

    getUserRecipes() {
      this.recipeService.getUserRecipes( this.authService.getUser().id ).subscribe(
        data => {
          this.recipes = data;
        }
      );
    }

}
