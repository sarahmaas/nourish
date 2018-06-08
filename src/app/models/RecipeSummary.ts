// https://www.npmjs.com/package/json2typescript

import {JsonObject, JsonProperty} from "json2typescript";

import { RecipeIngredient } from './RecipeIngredient';
import { RecipeUser } from './RecipeUser';


@JsonObject
export class RecipeSummary {

  @JsonProperty('id', Number)
  _id: number = undefined;
  get id() { return this._id; }

  @JsonProperty('title', String)
  title: string = undefined;

}