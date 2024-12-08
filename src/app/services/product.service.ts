import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  list(): Observable<Product[]> {   //Observable es una promesa
    return this.http.get<Product[]>(`${environment.url_ms_logica}/products`);
  }
  delete(id: number) {
    return this.http.delete<Product>(`${environment.url_ms_logica}/products/${id}`);
  }
  view(id:number): Observable<Product> {
    return this.http.get<Product>(`${environment.url_ms_logica}/products/${id}`);
  }
  create(product:Product): Observable<Product> {
    return this.http.post<Product>(`${environment.url_ms_logica}/products`,product);
  }
  update(product:Product): Observable<Product> {
    return this.http.put<Product>(`${environment.url_ms_logica}/products/${product.id}`,product);
  }
}
