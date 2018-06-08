import {JsonObject, JsonProperty} from 'json2typescript';
import { RecipeUser } from './RecipeUser';

@JsonObject
export class AbbrevMealPlan {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('name', String)
  name: string = undefined;

}
