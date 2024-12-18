import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http:HttpClient) { }

  list(): Observable<Hotel[]> {   //Observable es una promesa
    return this.http.get<Hotel[]>(`${environment.url_ms_logica}/hotels`);
  }
  delete(id: number) {
    return this.http.delete<Hotel>(`${environment.url_ms_logica}/hotels/${id}`);
  }
  view(id:number): Observable<Hotel> {
    return this.http.get<Hotel>(`${environment.url_ms_logica}/hotels/${id}`);
  }
  create(hotel:Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${environment.url_ms_logica}/hotels`,hotel);
  }
  update(id:number, hotel:Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${environment.url_ms_logica}/hotels/${id}`,hotel);
  }
}
