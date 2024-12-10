import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operations } from '../models/operations.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http:HttpClient) { }

  list(): Observable<Operations[]> {
    return this.http.get<Operations[]>(`${environment.url_ms_logica}/operations`);
  }
  delete(id: number) {
    return this.http.delete<Operations>(`${environment.url_ms_logica}/Operations/${id}`);
  }
  view(id:number): Observable<Operations> {
    return this.http.get<Operations>(`${environment.url_ms_logica}/Operations/${id}`);
  }
  create(operation:Operations): Observable<Operations> {
    return this.http.post<Operations>(`${environment.url_ms_logica}/operations`,operation);
  }
  update(operation:Operations): Observable<Operations> {
    return this.http.put<Operations>(`${environment.url_ms_logica}/operations/${operation.id}`,operation);
  }

}
