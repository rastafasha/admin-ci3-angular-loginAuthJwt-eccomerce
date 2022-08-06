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

    const url = `${base_url}api_producto/adminProductos/`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, productos: Producto[]}) => resp.productos)
      )

  }


  getProductoById(_id: string){
    const url = `${base_url}api_producto/adminProducto/${_id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, producto: Producto}) => resp.producto)
        );

  }


  crearProducto(producto: Producto){
    const url = `${base_url}api_producto/createProducto/`;
    return this.http.post(url, producto, this.headers);
  }

  actualizarProducto(_id:number, producto: Producto){
    const url = `${base_url}api_producto/updateProducto/${producto.id}`;
    return this.http.put(url, producto, this.headers);
  }

  borrarProducto(_id:number){
    const url = `${base_url}api_producto/deleteProducto/${_id}`;
    return this.http.delete(url, this.headers);
  }




}
