import {JsonObject, JsonProperty} from 'json2typescript';
import { RecipeUser } from './RecipeUser';
import { AbbrevMealPlan } from './AbbrevMealPlan';
import { IngredientShoppingList } from './IngredientShoppingList';

@JsonObject
export class ShoppingList {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('name', String)
  name: string = undefined;

  @JsonProperty('ingredient_shopping_lists', [IngredientShoppingList])
  ingredient_shopping_lists_attributes: IngredientShoppingList[] = undefined;

  @JsonProperty('user', RecipeUser)
  user: RecipeUser = undefined;

  @JsonProperty('meal_plan', AbbrevMealPlan)
  meal_plan: AbbrevMealPlan = undefined;

}
