import {JsonObject, JsonProperty} from "json2typescript";
import { IngredientCategory } from './IngredientCategory';

@JsonObject
export class Ingredient {
  @JsonProperty('id', Number)
  _id: number = undefined;

  @JsonProperty('name', String)
  name: string = undefined;

  @JsonProperty('ingredient_category', IngredientCategory)
  ingredient_category: IngredientCategory;

  get id() { return this._id; }

}
