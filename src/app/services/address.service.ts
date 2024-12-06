import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }

  list(): Observable<Address[]> {
    return this.http.get<Address[]>(`${environment.url_ms_logica}/addresses`);
  }
  delete(id: number) {
    return this.http.delete<Address>(`${environment.url_ms_logica}/addresses/${id}`);
  }
  view(id:number): Observable<Address> {
    return this.http.get<Address>(`${environment.url_ms_logica}/addresses/${id}`);
  }
  create(address:Address): Observable<Address> {
    return this.http.post<Address>(`${environment.url_ms_logica}/addresses`,address);
  }
  update(address:Address): Observable<Address> {
    return this.http.put<Address>(`${environment.url_ms_logica}/addresses/${address.id}`,address);
  }
}
