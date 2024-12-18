import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleDrivers } from '../models/vehicle-drivers.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleDriversService {

  constructor(private http:HttpClient) { }

  list(): Observable<VehicleDrivers[]> {   //Observable es una promesa
    return this.http.get<VehicleDrivers[]>(`${environment.url_ms_logica}/vehicle_drivers`);
  }
  delete(id: number) {
    return this.http.delete<VehicleDrivers>(`${environment.url_ms_logica}/vehicle_drivers/${id}`);
  }
  view(id:number): Observable<VehicleDrivers> {
    return this.http.get<VehicleDrivers>(`${environment.url_ms_logica}/vehicle_drivers/${id}`);
  }
  create(vehiDriver:VehicleDrivers): Observable<VehicleDrivers> {
    return this.http.post<VehicleDrivers>(`${environment.url_ms_logica}/vehicle_drivers`,vehiDriver);
  }
  update(id:number, vehiDriver:VehicleDrivers): Observable<VehicleDrivers> {
    return this.http.put<VehicleDrivers>(`${environment.url_ms_logica}/vehicle_drivers/${id}`,vehiDriver);
  }
}
