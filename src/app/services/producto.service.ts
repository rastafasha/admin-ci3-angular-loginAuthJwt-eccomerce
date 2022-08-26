import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { Observable } from "rxjs";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


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
    const url = `${base_url}api_producto/Producto/${id}`;
    return this.http.get<Producto>(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, producto: Producto}) => resp.producto)
      //   );

  }


  crearProducto(producto: Producto){
    const url = `${base_url}api_producto/createProducto`;
    return this.http.post(url, producto, this.headers);
  }

  actualizarProducto(id:number, producto: Producto){
    const url = `${base_url}api_producto/updateProducto/${id}`;
    return this.http.put(url, producto, this.headers);
  }

  borrarProducto(id:number){
    const url = `${base_url}api_producto/deleteProducto/${id}`;
    return this.http.delete(url, this.headers);
  }




}
