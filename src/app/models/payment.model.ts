export class Payment {
  id?: number;
  amount: number;
  start_date: Date;
  end_date: Date;
  status: boolean;
  contract_id?: number;
  receipt_id?: number;
}
