import {JsonObject, JsonProperty} from 'json2typescript';
import { RecipeUser } from './RecipeUser';
import { Ingredient } from './Ingredient';
import { Measure } from './Measure';

@JsonObject
export class IngredientShoppingList {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('amount', Number)
  amount: number = undefined;

  @JsonProperty('purchased', Boolean)
  purchased: boolean = undefined;

  @JsonProperty('ingredient', Ingredient)
  ingredient: Ingredient = undefined;

  @JsonProperty('measure', Measure)
  measure: Measure = undefined;

}
