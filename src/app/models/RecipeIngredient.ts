import {JsonObject, JsonProperty} from "json2typescript";

import { Measure } from './Measure';
import { Ingredient } from './Ingredient';

@JsonObject
export class RecipeIngredient {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('amount', Number)
  amount: number = undefined;

  @JsonProperty('measure', Measure)
  measure: Measure = undefined;

  @JsonProperty('ingredient', Ingredient)
  ingredient: Ingredient = undefined;

}
