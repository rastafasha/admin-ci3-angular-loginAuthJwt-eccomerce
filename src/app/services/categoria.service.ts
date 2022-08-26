import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';
import { Observable } from "rxjs";

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
    const url = `${base_url}api_category/Category/${id}`;
    return this.http.get<Categoria>(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, categoria: Categoria}) => resp.categoria)
      //   );

  }

  // cargarCategorias() {
  //   return this.http.get<Categoria>(this.serverUrl + 'api_category/adminCategorys/')
  // }

  // getCategoriaById(id: number) {
  //   return this.http.get<Categoria>(this.serverUrl + 'api_category/adminCategory/' + id)
  // }


  crearCategoria(categoria: Categoria){
    const url = `${base_url}api_category/createCategory`;
    return this.http.post(url, categoria, this.headers);
  }


  actualizarCategoria(id:number, categoria: Categoria){
    const url = `${base_url}api_category/updateCategory/${id}`;
    return this.http.put(url, categoria, this.headers);
  }

  borrarCategoria(id:number){
    const url = `${base_url}api_category/deleteCategory/${id}`;
    return this.http.delete(url, this.headers);
  }




}
