import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http:HttpClient) { }

  list(): Observable<Admin[]> {   //Observable es una promesa
    return this.http.get<Admin[]>(`${environment.url_ms_logica}/administrators`);
  }
  delete(id: number) {
    return this.http.delete<Admin>(`${environment.url_ms_logica}/administrators/${id}`);
  }
  view(id:number): Observable<Admin> {
    return this.http.get<Admin>(`${environment.url_ms_logica}/administrators/${id}`);
  }
  create(administrators:Admin): Observable<Admin> {
    return this.http.post<Admin>(`${environment.url_ms_logica}/administrators`,administrators);
  }
  update(administrators:Admin): Observable<Admin> {
    return this.http.put<Admin>(`${environment.url_ms_logica}/administrators/${administrators.id}`,administrators);
  }
}
