import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stage } from '../models/stage.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  constructor(private http:HttpClient) { }

  list(): Observable<Stage[]> {   //Observable es una promesa
    return this.http.get<Stage[]>(`${environment.url_ms_logica}/stages`);
  }
  delete(id: number) {
    return this.http.delete<Stage>(`${environment.url_ms_logica}/stages/${id}`);
  }
  view(id:number): Observable<Stage> {
    return this.http.get<Stage>(`${environment.url_ms_logica}/stages/${id}`);
  }
  create(stage:Stage): Observable<Stage> {
    return this.http.post<Stage>(`${environment.url_ms_logica}/stages`,stage);
  }
  update(id:number, stage:Stage): Observable<Stage> {
    return this.http.put<Stage>(`${environment.url_ms_logica}/stages/${id}`,stage);
  }
}
