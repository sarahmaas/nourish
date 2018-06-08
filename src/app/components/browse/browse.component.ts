import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {RecipeService} from "../../services/recipe.service";
import {Recipe} from '../../models/Recipe';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  private apiUrl;
  recipes = []; 
  showExtended: boolean = true; 

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