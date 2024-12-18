import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCategory } from '../models/product-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http:HttpClient) { }

  list(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${environment.url_ms_logica}/productcategory`);
  }
  delete(id: number) {
    return this.http.delete<ProductCategory>(`${environment.url_ms_logica}/productcategory/${id}`);
  }
  view(id:number): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`${environment.url_ms_logica}/productcategory/${id}`);
  }
  create(productCategory:ProductCategory): Observable<ProductCategory> {
    return this.http.post<ProductCategory>(`${environment.url_ms_logica}/productcategory`,productCategory);
  }
  update(id:number, productCategory:ProductCategory): Observable<ProductCategory> {
    return this.http.put<ProductCategory>(`${environment.url_ms_logica}/productcategory/${id}`,productCategory);
  }
}
