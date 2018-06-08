import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class IngredientCategory {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('name', String)
  name: string = undefined;

}
