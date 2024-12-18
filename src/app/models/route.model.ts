export class Route {
  id?: number;
  contract_id: number;
  vehicle_id: number;
  vehicle?: {
    id: number;
    plate: string;
  };
}
