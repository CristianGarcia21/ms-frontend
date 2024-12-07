import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }

  list(): Observable<Vehicle[]> {   //Observable es una promesa
    return this.http.get<Vehicle[]>(`${environment.url_ms_logica}/vehicles`);
  }
  delete(id: number) {
    return this.http.delete<Vehicle>(`${environment.url_ms_logica}/vehicles/${id}`);
  }
  view(id:number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.url_ms_logica}/vehicles/${id}`);
  }
  create(vehicle:Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${environment.url_ms_logica}/vehicles`,vehicle);
  }
  update(vehicle:Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${environment.url_ms_logica}/vehicles/${vehicle.id}`,vehicle);
  }

  updateLocation(id: number, location: any): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${environment.url_ms_logica}/vehicles/${id}/location`, location);
  }
}
