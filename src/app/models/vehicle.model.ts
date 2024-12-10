import { Operations } from "./operations.model";

export class Vehicle {
  id?:number;
  plate:string;
  brand:string;
  type_vehicle:string;
  load_capacity:number;
  latitude:number;
  longitude:number;
  operations?: Operations[];
}
