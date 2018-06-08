// https://www.npmjs.com/package/json2typescript

import {JsonObject, JsonProperty} from "json2typescript";

import { Recipe } from './Recipe';
import { DietaryRestriction } from './DietaryRestriction';
import { RecipeUser } from './RecipeUser';
import { MealPlanRecipe } from './MealPlanRecipe';

@JsonObject
export class MealPlan {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('name', String)
  name: string = undefined;

  @JsonProperty('meal_plan_recipes', [ MealPlanRecipe ])
  meal_plan_recipes_attributes: MealPlanRecipe[] = undefined;

  @JsonProperty('user', RecipeUser)
  user: RecipeUser = undefined;
  hide?: true;

}
