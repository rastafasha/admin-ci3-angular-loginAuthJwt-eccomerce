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
      .pipe(
        map((resp:{ok: boolean, categorias: Categoria[]}) => resp.categorias)
      )

  }


  getCategoriaById(_id: number){
    const url = `${base_url}api_category/adminCategory/${_id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, categoria: Categoria}) => resp.categoria)
        );

  }


  crearCategoria(categoria: Categoria){
    const url = `${base_url}api_category/createCategory`;
    return this.http.post(url, categoria, this.headers);
  }

  actualizarCategoria(categoria: Categoria){
    const url = `${base_url}api_category/updateCategory/${categoria.id}`;
    return this.http.put(url, categoria, this.headers);
  }

  borrarCategoria(_id:number){
    const url = `${base_url}api_category/deleteCategory/${_id}`;
    return this.http.delete(url, this.headers);
  }




}
