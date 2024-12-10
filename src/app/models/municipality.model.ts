import { Departament } from "./departament.model";
import { Operations } from "./operations.model";


export class Municipality {
  id?: number;
  name: string;
  department_id?: number; // Asegúrate de que el tipo sea correcto
  department?: {
    id?: number;
    name: string;
  };
  operations?: Operations[];
}
