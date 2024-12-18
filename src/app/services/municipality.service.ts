import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipality } from '../models/municipality.model';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
import { Operation } from 'ol/source/Raster';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {


  constructor(private http:HttpClient) { }

  list(): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(`${environment.url_ms_logica}/municipalities`);
  }
  delete(id: number) {
    return this.http.delete<Municipality>(`${environment.url_ms_logica}/municipalities/${id}`);
  }
  view(id:number): Observable<Municipality> {
    return this.http.get<Municipality>(`${environment.url_ms_logica}/municipalities/${id}`);
  }
  create(municipality:Municipality): Observable<Municipality> {
    return this.http.post<Municipality>(`${environment.url_ms_logica}/municipalities`,municipality);
  }
  update(municipality:Municipality): Observable<Municipality> {
    return this.http.put<Municipality>(`${environment.url_ms_logica}/municipalities/${municipality.id}`,municipality);
  }
   /**
   * Obtener las direcciones de un municipio específico
   * @param municipalityId ID del municipio
   * @returns Observable con las direcciones
   */
   getAddresses(municipalityId: number): Observable<Address[]> {
    return this.http.get<Address[]>(
      `${environment.url_ms_logica}/municipalities/${municipalityId}/addresses`
    );

  }

  getOperations(municipalityId: number): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${environment.url_ms_logica}/municipalities/${municipalityId}/operations`);
  }
}
