import { Injectable } from '@angular/core';
import { Shift } from '../models/shift.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http:HttpClient) { }

  list(): Observable<Shift[]> {   //Observable es una promesa
    return this.http.get<Shift[]>(`${environment.url_ms_logica}/shifts`);
  }
  delete(id: number) {
    return this.http.delete<Shift>(`${environment.url_ms_logica}/shifts/${id}`);
  }
  view(id:number): Observable<Shift> {
    return this.http.get<Shift>(`${environment.url_ms_logica}/shifts/${id}`);
  }
  create(shift:Shift): Observable<Shift> {
    return this.http.post<Shift>(`${environment.url_ms_logica}/shifts`,shift);
  }
  update(shift: Partial<Shift>): Observable<Shift> {
    if (!shift.id) {
      throw new Error('El ID del turno es requerido para la actualización.');
    }
    return this.http.put<Shift>(`${environment.url_ms_logica}/shifts/${shift.id}`, shift);
  }

}
