import { Client } from "./client.model";

export class Contract {
  id?: number;
  start_date: Date;
  end_date: Date;
  amount:number;
  estate:boolean;
  client_id?: number;
  clientDetails?: {
    id?: number;
    user_id: string;
    zip_code: string;
    city: string;
    address: string;

  };


}
