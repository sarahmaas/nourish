// https://www.npmjs.com/package/json2typescript

import { JsonObject, JsonProperty } from 'json2typescript';

import { DietaryRestrictionRecipe } from './DietaryRestrictionRecipe';
import { RecipeUser } from './RecipeUser';
import { IngredientRecipe } from './IngredientRecipe';


@JsonObject
export class Recipe {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('title', String)
  title: string = undefined;

  @JsonProperty('summary', String)
  summary: string = undefined;

  @JsonProperty('servings', Number)
  servings: number = undefined;

  @JsonProperty('instructions', String)
  instructions: string = undefined;

  @JsonProperty('ingredient_recipes', [IngredientRecipe])
  ingredient_recipes_attributes: IngredientRecipe[] = undefined;

  @JsonProperty('dietary_restriction_recipes', [DietaryRestrictionRecipe])
  dietary_restriction_recipes_attributes: DietaryRestrictionRecipe [] = undefined;

  @JsonProperty('user', RecipeUser)
  user: RecipeUser = undefined;

}
