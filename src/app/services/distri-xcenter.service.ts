import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DistributionCenter } from '../models/distribution-center.model';

@Injectable({
  providedIn: 'root'
})
export class DistriXCenterService {

  constructor(private http:HttpClient) { }

  list(): Observable<DistributionCenter[]> {   //Observable es una promesa
    return this.http.get<DistributionCenter[]>(`${environment.url_ms_logica}/distribution_centers`);
  }
  delete(id: number) {
    return this.http.delete<DistributionCenter>(`${environment.url_ms_logica}/distribution_centers/${id}`);
  }
  view(id:number): Observable<DistributionCenter> {
    return this.http.get<DistributionCenter>(`${environment.url_ms_logica}/distribution_centers/${id}`);
  }
  create(distributionCenter:DistributionCenter): Observable<DistributionCenter> {
    return this.http.post<DistributionCenter>(`${environment.url_ms_logica}/distribution_centers`,distributionCenter);
  }
  update(distributionCenter:DistributionCenter): Observable<DistributionCenter> {
    return this.http.put<DistributionCenter>(`${environment.url_ms_logica}/distribution_centers/${distributionCenter.id}`,distributionCenter);
  }

}
