import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from '../models/receipt.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  constructor(private http:HttpClient) { }

  list(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(`${environment.url_ms_logica}/receipts`);
  }
  delete(id: number) {
    return this.http.delete<Receipt>(`${environment.url_ms_logica}/receipts/${id}`);
  }
  view(id:number): Observable<Receipt> {
    return this.http.get<Receipt>(`${environment.url_ms_logica}/receipts/${id}`);
  }
  create(restaurant:Receipt): Observable<Receipt> {
    return this.http.post<Receipt>(`${environment.url_ms_logica}/receipts`,restaurant);
  }
  update(restaurant:Receipt): Observable<Receipt> {
    return this.http.put<Receipt>(`${environment.url_ms_logica}/receipts/${restaurant.id}`,restaurant);
  }
}
