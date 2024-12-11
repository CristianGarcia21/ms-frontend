import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  list(): Observable<Payment[]> {   //Observable es una promesa
    return this.http.get<Payment[]>(`${environment.url_ms_logica}/payments`);
  }
  delete(id: number) {
    return this.http.delete<Payment>(`${environment.url_ms_logica}/payments/${id}`);
  }
  view(id:number): Observable<Payment> {
    return this.http.get<Payment>(`${environment.url_ms_logica}/payments/${id}`);
  }
  create(payments:Payment): Observable<Payment> {
    return this.http.post<Payment>(`${environment.url_ms_logica}/payments`,payments);
  }
  update(payments:Payment): Observable<Payment> {
    return this.http.put<Payment>(`${environment.url_ms_logica}/payments/${payments.id}`,payments);
  }
}
