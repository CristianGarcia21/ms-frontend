import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http:HttpClient) { }

  list(): Observable<Route[]> {
    return this.http.get<Route[]>(`${environment.url_ms_logica}/routes`);
  }
  delete(id: number) {
    return this.http.delete<Route>(`${environment.url_ms_logica}/routes/${id}`);
  }
  view(id:number): Observable<Route> {
    return this.http.get<Route>(`${environment.url_ms_logica}/routes/${id}`);
  }
  create(route:Route): Observable<Route> {
    return this.http.post<Route>(`${environment.url_ms_logica}/routes`,route);
  }
  update(id :number, route:Route): Observable<Route> {
    return this.http.put<Route>(`${environment.url_ms_logica}/routes/${id}`,route);
  }
  listByVehicle(vehicleId: number): Observable<Route[]> {
    return this.http.get<Route[]>(`${environment.url_ms_logica}/routes/vehicle/${vehicleId}`);
  }

  listRoutesByContract(contractId: number): Observable<Route[]> {
    return this.http.get<Route[]>(`${environment.url_ms_logica}/contracts/${contractId}/routes`);
  }
}
