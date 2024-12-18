import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NaturalPerson } from '../models/natural-person.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NaturalPersonService {

  constructor(private http: HttpClient) {}

  list(): Observable<NaturalPerson[]> {
    return this.http.get<NaturalPerson[]>(`${environment.url_ms_logica}/natural_people`);
  }

  delete(id: number) {
    return this.http.delete<NaturalPerson>(`${environment.url_ms_logica}/natural_people/${id}`);
  }
  view(id:number): Observable<NaturalPerson> {
    return this.http.get<NaturalPerson>(`${environment.url_ms_logica}/natural_people/${id}`);
  }
  create(natural_people:NaturalPerson): Observable<NaturalPerson> {
    return this.http.post<NaturalPerson>(`${environment.url_ms_logica}/natural_people`,natural_people);
  }
  update(id:number, natural_people:NaturalPerson): Observable<NaturalPerson> {
    return this.http.put<NaturalPerson>(`${environment.url_ms_logica}/natural_people/${id}`,natural_people);
  }
}
