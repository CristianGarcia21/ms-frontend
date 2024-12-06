export class Address {
  id?: number;
  street: string;
  number: number;
  neighborhood: string;
  municipality_id?: number;
  municipality?: {
    id: number;
    name: string;
    department_id: number;
  };
  department?: string;
}
