import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Marca } from '../models/marca.model';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

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


  cargarMarcas(){

    const url = `${base_url}api_marca/adminMarcas/`;
    return this.http.get(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, marcas: Marca[]}) => resp.marcas)
      // )

  }


  getMarcaById(id: number): Observable<Marca>{
    const url = `${base_url}api_marca/adminMarca/${id}`;
    return this.http.get<Marca>(url, this.headers)

  }


  crearMarca(marca){
    return this.http.post<any>(this.serverUrl + 'api_marca/createMarca/', marca)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_marca/createMarca/`;
    // return this.http.post(url, marca, this.headers);
  }

  actualizarMarca(marca, id:number){
    return this.http.post<any>(this.serverUrl + 'api_marca/updateMarca/' + id, marca)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_marca/updateMarca/${id}`;
    // return this.http.put(url, id, this.headers);
  }

  borrarMarca(id:number){
    return this.http.delete(this.serverUrl + 'api_marca/deleteMarca/' + id).pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_marca/deleteMarca/${id}`;
    // return this.http.delete(url, this.headers);
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
