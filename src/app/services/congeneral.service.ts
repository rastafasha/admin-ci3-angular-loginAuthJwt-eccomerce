import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Configuracion } from '../models/configuracion.model';
import { Observable, throwError } from "rxjs";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CongeneralService {

  public configuracion: Configuracion;
  serverUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

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


  cargarCongenerals(){

    return this.http.get<Configuracion>(this.serverUrl + 'api_configuracion/Configuracions').pipe(
      catchError(this.handleError)
    );

    // const url = `${base_url}api_configuracion/adminConfiguracions`;
    // return this.http.get(url)
    //   .pipe(
    //     map((resp:{ok: boolean, configuracions: Configuracion[]}) => resp.configuracions)
    //   )


  }


  getCongeneralById(id: number){
    return this.http.get<Configuracion>(this.serverUrl + 'api_configuracion/Configuracion/' + id).pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_configuracion/Configuracion/${id}`;
    // return this.http.get<Configuracion>(url, this.headers)


  }


  crearCongeneral(configuracion){
    return this.http.post<any>(this.serverUrl + 'api_configuracion/createConfiguracion', configuracion)
    .pipe(
      catchError(this.handleError)
    );
  // return this.http.post<any>(this.serverUrl + 'api_configuracion/createConfiguracion', configuracion)
    // const url = `${base_url}api_configuracion/createConfiguracion`;
    // return this.http.post(url, configuracion);
  }

  actualizarCongeneral(configuracion, id:number){
    return this.http.post<any>(this.serverUrl + 'api_configuracion/updateConfiguracion/' + id, configuracion)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_configuracion/updateConfiguracion/${configuracion.id}`;
    // return this.http.put(url, configuracion);
  }

  borrarCongeneral(_id:number){
    const url = `${base_url}api_configuracion/deleteConfiguracion/${_id}`;
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
