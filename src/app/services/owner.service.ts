import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../models/owner.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http:HttpClient) { }

  list(): Observable<Owner[]> {   //Observable es una promesa
    return this.http.get<Owner[]>(`${environment.url_ms_logica}/owners`);
  }
  delete(id: number) {
    return this.http.delete<Owner>(`${environment.url_ms_logica}/owners/${id}`);
  }
  view(id:number): Observable<Owner> {
    return this.http.get<Owner>(`${environment.url_ms_logica}/owners/${id}`);
  }
  create(owner:Owner): Observable<Owner> {
    return this.http.post<Owner>(`${environment.url_ms_logica}/owners`,owner);
  }
  update(id:number, owner:Owner): Observable<Owner> {
    return this.http.put<Owner>(`${environment.url_ms_logica}/owners/${id}`,owner);
  }
}

