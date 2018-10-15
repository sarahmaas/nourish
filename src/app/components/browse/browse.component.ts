import { Component, OnInit } from '@angular/core';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/Recipe';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  private apiUrl;
  recipes = [];
  showExtended = true;

  constructor(private recipeService: RecipeService) {
    this.getRecipes();
  }
  ngOnInit() {}

  getRecipes() {
    this.recipeService.getAllRecipes().subscribe(
      data => {
        console.log('Recipe Service data');
        console.log(data);
        this.recipes = data;
      }
    );
  }

}
