import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';
import { Envio } from "../models/postal.model";

import { catchError, map } from 'rxjs/operators';
import { URL } from 'url';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PostalService {

  public envio: Envio;

  public url;
  serverUrl = environment.baseUrl;

  constructor(
    private http : HttpClient
  ) {
    this.url = environment.baseUrl;
   }

   get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'Authorization': this.token
      }
    }
  }

  crearEnvio(envio){
    return this.http.post<any>(this.serverUrl + 'api_envio/createEnvio', envio)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_category/createCategory`;
    // return this.http.post(url, categoria, this.headers);
  }

  // registro(data):Observable<any>{
  //   return this.http.post<any>(this.serverUrl + 'api_envio/createEnvio/', data)
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  //   // const url = `${base_url}api_envio/createEnvio`;
  //   // return this.http.post(url, data, this.headers);
  // }

  listar():Observable<any>{

    const url = `${base_url}api_envio/adminEnvios`;
    return this.http.get(url, this.headers)
    }

  getPostal(id):Observable<any>{
    const url = `${base_url}api_envio/adminEnvio/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, cupon: Envio}) => resp.cupon)
      );
  }

  eliminar(id:number){
    const url = `${base_url}api_envio/deleteEnvio/${id}`;
    return this.http.delete(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

}
