import {JsonObject, JsonProperty} from "json2typescript";
import { DietaryRestriction } from './DietaryRestriction';

@JsonObject
export class DietaryRestrictionRecipe {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('recipe_id', Number)
  recipe_id: number = undefined;

  @JsonProperty('dietary_restriction', DietaryRestriction)
  dietary_restriction: DietaryRestriction = undefined;

}
