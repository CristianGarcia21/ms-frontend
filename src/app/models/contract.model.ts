import { Client } from "./client.model";

export class Contract {
  id?: number;
  start_date: Date;
  end_date: Date;
  amount:number;
  estate:boolean;
  client?:Client
}
