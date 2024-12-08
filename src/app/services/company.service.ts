import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  list(): Observable<Company[]> {   //Observable es una promesa
    return this.http.get<Company[]>(`${environment.url_ms_logica}/companies`);
  }
  delete(id: number) {
    return this.http.delete<Company>(`${environment.url_ms_logica}/companies/${id}`);
  }
  view(id:number): Observable<Company> {
    return this.http.get<Company>(`${environment.url_ms_logica}/companies/${id}`);
  }
  create(company:Company): Observable<Company> {
    return this.http.post<Company>(`${environment.url_ms_logica}/companies`,company);
  }
  update(company:Company): Observable<Company> {
    return this.http.put<Company>(`${environment.url_ms_logica}/companies/${company.id}`,company);
  }
}
