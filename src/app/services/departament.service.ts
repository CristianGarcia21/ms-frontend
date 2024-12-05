import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departament } from '../models/departament.model';
import { environment } from 'src/environments/environment';
import { Municipality } from '../models/municipality.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  constructor(private http:HttpClient) { }

  list(): Observable<Departament[]> {
    return this.http.get<Departament[]>(`${environment.url_ms_logica}/departments`);
  }
  delete(id: number) {
    return this.http.delete<Departament>(`${environment.url_ms_logica}/departments/${id}`);
  }
  view(id:number): Observable<Departament> {
    return this.http.get<Departament>(`${environment.url_ms_logica}/departments/${id}`);
  }
  create(departament:Departament): Observable<Departament> {
    return this.http.post<Departament>(`${environment.url_ms_logica}/departments`,departament);
  }
  update(departament:Departament): Observable<Departament> {
    return this.http.put<Departament>(`${environment.url_ms_logica}/departments/${departament.id}`,departament);
  }

  getMunicipalities(departmentId: number): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(`${environment.url_ms_logica}/departments/${departmentId}/municipalities`);
  }
}
