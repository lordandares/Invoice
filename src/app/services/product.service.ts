import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Product } from '../models/classes/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL = environment.APIEndpointProducts;
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      tenantId: '048ae5e4-004e-427a-8a5d-3a4a42c47ee7',
    })
  };


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL, this.httpOptions).pipe(
      map((Products: Product[]) => {
        return Products.map((product: Product) => new Product().deserialize(product));
      }),
      retry(1),
      catchError(this.handleError),
    );
  }

  setProducts(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURL, product, this.httpOptions).pipe(
      map((res: Product) => {
        return new Product().deserialize(res);
      }),
      retry(1),
      catchError(this.handleError),
    );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
