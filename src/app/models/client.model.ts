import { Contract } from "./contract.model";

export class Client {
  id?: number;
  address: string;
  city: string;
  zip_code: string;
  user_id: string;
  contracts?: Contract[]
}
