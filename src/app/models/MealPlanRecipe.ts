// https://www.npmjs.com/package/json2typescript

import {JsonObject, JsonProperty} from "json2typescript";

import { Recipe } from './Recipe';
import { RecipeUser } from './RecipeUser';

@JsonObject
export class MealPlanRecipe {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('day', String)
  day: string = undefined;

  @JsonProperty('meal', String)
  meal: string = undefined;

  @JsonProperty('recipe_id', Number)
  recipe_id: number = undefined;

}
