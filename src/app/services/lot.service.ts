import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lot } from '../models/lot.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(private http:HttpClient) { }

  list(): Observable<Lot[]> {   //Observable es una promesa
    return this.http.get<Lot[]>(`${environment.url_ms_logica}/lots`);
  }
  delete(id: number) {
    return this.http.delete<Lot>(`${environment.url_ms_logica}/lots/${id}`);
  }
  view(id:number): Observable<Lot> {
    return this.http.get<Lot>(`${environment.url_ms_logica}/lots/${id}`);
  }
  create(lot:Lot): Observable<Lot> {
    return this.http.post<Lot>(`${environment.url_ms_logica}/lots`,lot);
  }
  update(id:number, lot:Lot): Observable<Lot> {
    return this.http.put<Lot>(`${environment.url_ms_logica}/lots/${id}`,lot);
  }
}
