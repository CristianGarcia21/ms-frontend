import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  list(): Observable<Service[]> {   //Observable es una promesa
    return this.http.get<Service[]>(`${environment.url_ms_logica}/services`);
  }
  delete(id: number) {
    return this.http.delete<Service>(`${environment.url_ms_logica}/services/${id}`);
  }
  view(id:number): Observable<Service> {
    return this.http.get<Service>(`${environment.url_ms_logica}/services/${id}`);
  }
  create(service:Service): Observable<Service> {
    return this.http.post<Service>(`${environment.url_ms_logica}/services`,service);
  }
  update(id:number, service:Service): Observable<Service> {
    return this.http.put<Service>(`${environment.url_ms_logica}/services/${id}`,service);
  }
}
