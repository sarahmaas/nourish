// https://www.npmjs.com/package/json2typescript

import { JsonObject, JsonProperty } from 'json2typescript';
import { RecipeUser } from './RecipeUser';

@JsonObject
export class RecipeSummary {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('title', String)
  title: string = undefined;

}
