import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Client } from '../models/classes/client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  apiURL = environment.APIEndpointClients;
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'tenantId' : '048ae5e4-004e-427a-8a5d-3a4a42c47ee7'
    })
  };

  // HttpClient API get() method => Fetch employees list
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiURL, this.httpOptions).pipe(
      map((Clients: Client[]) => {
        return Clients.map((client: Client) => new Client().deserialize(client));
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
