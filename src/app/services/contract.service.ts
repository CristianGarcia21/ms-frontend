import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http:HttpClient) { }

  list(): Observable<Contract[]> {   //Observable es una promesa
    return this.http.get<Contract[]>(`${environment.url_ms_logica}/contracts`);
  }
  delete(id: number) {
    return this.http.delete<Contract>(`${environment.url_ms_logica}/contracts/${id}`);
  }
  view(id:number): Observable<Contract> {
    return this.http.get<Contract>(`${environment.url_ms_logica}/contracts/${id}`);
  }
  create(contract:Contract): Observable<Contract> {
    return this.http.post<Contract>(`${environment.url_ms_logica}/contracts`,contract);
  }
  update(contract:Contract): Observable<Contract> {
    console.log(contract.id);
    return this.http.put<Contract>(`${environment.url_ms_logica}/contracts/${contract.id}`,contract);
  }

}
