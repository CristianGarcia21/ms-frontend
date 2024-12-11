import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleOwner } from '../models/vehicle-owner.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleOwnerService {

  constructor(private http:HttpClient) { }

  list(): Observable<VehicleOwner[]> {   //Observable es una promesa
    return this.http.get<VehicleOwner[]>(`${environment.url_ms_logica}/vehicle_owners`);
  }
  delete(id: number) {
    return this.http.delete<VehicleOwner>(`${environment.url_ms_logica}/vehicle_owners/${id}`);
  }
  view(id:number): Observable<VehicleOwner> {
    return this.http.get<VehicleOwner>(`${environment.url_ms_logica}/vehicle_owners/${id}`);
  }
  create(vehiOwner:VehicleOwner): Observable<VehicleOwner> {
    return this.http.post<VehicleOwner>(`${environment.url_ms_logica}/vehicle_owners`,vehiOwner);
  }
  update(vehiOwner:VehicleOwner): Observable<VehicleOwner> {
    return this.http.put<VehicleOwner>(`${environment.url_ms_logica}/vehicle_owners/${vehiOwner.id}`,vehiOwner);
  }
}
