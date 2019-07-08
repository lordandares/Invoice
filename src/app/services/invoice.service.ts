import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Invoice } from '../models/classes/invoice';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  apiURL = environment.APIEndpointInvoices;
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      tenantId: '048ae5e4-004e-427a-8a5d-3a4a42c47ee7',
      'Response-Type': 'blob'
    })
  };


  createInvoice(invoice: Invoice): Observable<any> {
    const headers = new HttpHeaders({
      tenantId: '048ae5e4-004e-427a-8a5d-3a4a42c47ee7',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    return this.http.post<any>(this.apiURL, invoice, { headers, responseType: 'blob' as 'json' }).pipe(
      map((res: any) => {
       return res;
      })
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
