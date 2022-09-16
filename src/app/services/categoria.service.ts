import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';
import { Observable, throwError } from "rxjs";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  serverUrl = environment.baseUrl;
  public category: Categoria;

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


  cargarCategorias(){

    const url = `${base_url}api_category/adminCategorys`;
    return this.http.get(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, categorias: Categoria[]}) => resp.categorias)
      // )

  }



  getCategoriaById(id: number): Observable<Categoria>{
    const url = `${base_url}api_category/adminCategory/${id}`;
    return this.http.get<Categoria>(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, categoria: Categoria}) => resp.categoria)
      //   );

  }



  crearCategoria(categoria){
    return this.http.post<any>(this.serverUrl + 'api_category/createCategory', categoria)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_category/createCategory`;
    // return this.http.post(url, categoria, this.headers);
  }


  actualizarCategoria( categoria, id:number){

    return this.http.post<any>(this.serverUrl + 'api_category/updateCategory/' + id, categoria)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_category/updateCategory/${id}`;
    // return this.http.put(url, categoria, this.headers);
  }

  borrarCategoria(id:number){
    return this.http.delete(this.serverUrl + 'api_category/deleteCategory/' + id).pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_category/deleteCategory/${id}`;
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
