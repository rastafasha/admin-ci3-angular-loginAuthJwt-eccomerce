import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Promocion } from '../models/promocion.model';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  public promocion: Promocion;
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


  cargarPromocions(){

    const url = `${base_url}api_promocion/adminPromocions`;
    return this.http.get(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, promocions: Promocion[]}) => resp.promocions)
      // )

  }


  getPromocionById(id: number): Observable<Promocion>{
    const url = `${base_url}api_promocion/adminPromocion/${id}`;
    return this.http.get<Promocion>(url, this.headers)
    .pipe(
      catchError(this.handleError)
    );
      // .pipe(
      //   map((resp:{ok: boolean, promocion: Promocion}) => resp.promocion)
      //   );

  }


  crearPromocion(promocion){
    return this.http.post<any>(this.serverUrl + 'api_promocion/createPromocion', promocion)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_promocion/createPromocion`;
    // return this.http.post(url, promocion, this.headers);
  }

  actualizarPromocion( promocion, id:number){
    return this.http.post<any>(this.serverUrl + 'api_promocion/updatePromocion/' + id, promocion)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_promocion/updatePromocion/${id}`;
    // return this.http.put(url, promocion, this.headers);
  }

  borrarPromocion(id:number){
    const url = `${base_url}api_promocion/deletePromocion/${id}`;
    return this.http.delete(url, this.headers);
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
