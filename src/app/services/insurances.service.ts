import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insurances } from '../models/insurances.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsurancesService {

  constructor(private http:HttpClient) { }

  list(): Observable<Insurances[]> {   //Observable es una promesa
    return this.http.get<Insurances[]>(`${environment.url_ms_logica}/insurances`);
  }
  delete(id: number) {
    return this.http.delete<Insurances>(`${environment.url_ms_logica}/insurances/${id}`);
  }
  view(id:number): Observable<Insurances> {
    return this.http.get<Insurances>(`${environment.url_ms_logica}/insurances/${id}`);
  }
  create(insurances:Insurances): Observable<Insurances> {
    return this.http.post<Insurances>(`${environment.url_ms_logica}/insurances`,insurances);
  }
  update(insurances:Insurances): Observable<Insurances> {
    return this.http.put<Insurances>(`${environment.url_ms_logica}/insurances/${insurances.id}`,insurances);
  }
}

