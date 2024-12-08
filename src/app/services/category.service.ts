import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  list(): Observable<Category[]> {   //Observable es una promesa
    return this.http.get<Category[]>(`${environment.url_ms_logica}/categories`);
  }
  delete(id: number) {
    return this.http.delete<Category>(`${environment.url_ms_logica}/categories/${id}`);
  }
  view(id:number): Observable<Category> {
    return this.http.get<Category>(`${environment.url_ms_logica}/categories/${id}`);
  }
  create(category:Category): Observable<Category> {
    return this.http.post<Category>(`${environment.url_ms_logica}/categories`,category);
  }
  update(category:Category): Observable<Category> {
    return this.http.put<Category>(`${environment.url_ms_logica}/categories/${category.id}`,category);
  }
}
