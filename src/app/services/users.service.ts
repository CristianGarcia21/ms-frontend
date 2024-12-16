import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  list(): Observable<User[]> {   //Observable es una promesa
    return this.http.get<User[]>(`${environment.url_ms_logica}/user`);
  }
  delete(id: number) {
    return this.http.delete<User>(`${environment.url_ms_logica}/user/${id}`);
  }
  view(id:number): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_logica}/user/${id}`);
  }
  create(user:User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_logica}/user`,user);
  }
  update(user:User): Observable<User> {
    return this.http.put<User>(`${environment.url_ms_logica}/user/${user.id}`,user);
  }
  getLogicUserIdByMongoId(mongoUserId: string): Observable<any> {
    const url = `${environment.url_ms_logica}/users/${mongoUserId}`;
    return this.http.get<any>(url);
  }
}
