import { Component, Input, OnInit } from '@angular/core';

import {Recipe} from '../../models/Recipe';
import {RecipeService} from '../../services/recipe.service';
import {AuthService} from '../../services/auth.service';

import {TitleCasePipe} from '../../pipes/title-case.pipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  hide = true;
  @Input() id: number;
  recipe: Recipe;

  constructor(public authService: AuthService, public recipeService: RecipeService) {}

  ngOnInit() {
    this.getRecipeData(this.id);
  }

  private getRecipeData(id: number) {
    this.recipeService.getUserRecipeById(id).subscribe( data => {
      this.recipe = data;
    });
  }

}

