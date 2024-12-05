import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  list(): Observable<Client[]> {   //Observable es una promesa
    return this.http.get<Client[]>(`${environment.url_ms_logica}/clients`);
  }
  delete(id: number) {
    return this.http.delete<Client>(`${environment.url_ms_logica}/clients/${id}`);
  }
  view(id:number): Observable<Client> {
    return this.http.get<Client>(`${environment.url_ms_logica}/clients/${id}`);
  }
  create(client:Client): Observable<Client> {
    return this.http.post<Client>(`${environment.url_ms_logica}/clients`,client);
  }
  update(client:Client): Observable<Client> {
    return this.http.put<Client>(`${environment.url_ms_logica}/clients/${client.id}`,client);
  }
}
