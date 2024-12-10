import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenses } from '../models/expenses.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http:HttpClient) { }

  list(): Observable<Expenses[]> {   //Observable es una promesa
    return this.http.get<Expenses[]>(`${environment.url_ms_logica}/expenses`);
  }
  delete(id: number) {
    return this.http.delete<Expenses>(`${environment.url_ms_logica}/expenses/${id}`);
  }
  view(id:number): Observable<Expenses> {
    return this.http.get<Expenses>(`${environment.url_ms_logica}/expenses/${id}`);
  }
  create(expenses:Expenses): Observable<Expenses> {
    return this.http.post<Expenses>(`${environment.url_ms_logica}/expenses`,expenses);
  }
  update(expenses:Expenses): Observable<Expenses> {
    return this.http.put<Expenses>(`${environment.url_ms_logica}/expenses/${expenses.id}`,expenses);
  }
}
