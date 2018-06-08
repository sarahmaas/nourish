import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class DietaryRestriction {

  @JsonProperty('id', Number)
  _id: number = undefined;
  get id() { return this._id; }

  @JsonProperty('name', String)
  name: string = undefined;

}