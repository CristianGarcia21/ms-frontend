import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }

  list(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${environment.url_ms_logica}/restaurants`);
  }
  delete(id: number) {
    return this.http.delete<Restaurant>(`${environment.url_ms_logica}/restaurants/${id}`);
  }
  view(id:number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${environment.url_ms_logica}/restaurants/${id}`);
  }
  create(restaurant:Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${environment.url_ms_logica}/restaurants`,restaurant);
  }
  update(id:number, restaurant:Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${environment.url_ms_logica}/restaurants/${id}`,restaurant);
  }
}
