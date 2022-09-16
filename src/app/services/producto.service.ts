import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { Observable, throwError } from "rxjs";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  serverUrl = environment.baseUrl;
  public producto: Producto;

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


  cargarProductos(){

    const url = `${base_url}api_producto/adminProductos`;
    return this.http.get(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, productos: Producto[]}) => resp.productos)
      // )

  }


  getProductoById(id: number): Observable<Producto>{
    const url = `${base_url}api_producto/adminProducto/${id}`;
    return this.http.get<Producto>(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, producto: Producto}) => resp.producto)
      //   );

  }

  crearProducto(producto){
    return this.http.post<any>(this.serverUrl + 'api_producto/createProducto', producto)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_producto/createProducto`;
    // return this.http.post(url, data, this.headers);
  }

  actualizarProducto( producto, id:number){
    return this.http.post<any>(this.serverUrl + 'api_producto/updateProducto/' + id, producto)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_producto/updateProducto/${id}`;
    // return this.http.put(url, producto, this.headers);
  }

  borrarProducto(id:number){
    return this.http.delete(this.serverUrl + 'api_producto/deleteProducto/' + id).pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_producto/deleteProducto/${id}`;
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
