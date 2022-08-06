import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Marca } from '../models/marca.model';
import { Producto } from '../models/producto.model';
import { Categoria } from '../models/categoria.model';
import { Curso } from '../models/curso.model';
import { Slider } from '../models/slider.model';
import { Promocion } from '../models/promocion.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private trasnformarUsuarios(resultados: any[]): Usuario[]{
    return resultados.map(
      user => new Usuario( user.first_name, user.last_name, user.username, user.email, user.img, user.google, user.role_id, user.uid)
    )
  }

  private trasnformarCategorias(resultados: any[]): Categoria[]{
    return resultados;
  }
  private trasnformarProductos(resultados: any[]): Producto[]{
    return resultados;
  }
  private trasnformarMarcas(resultados: any[]): Marca[]{
    return resultados;
  }
  private trasnformarCursos(resultados: any[]): Curso[]{
    return resultados;
  }
  private trasnformarSliders(resultados: any[]): Slider[]{
    return resultados;
  }
  private trasnformarPromocions(resultados: any[]): Promocion[]{
    return resultados;
  }

  buscar(tipo: 'users'|'categories' |'marcas' |'productos' |'cursos'|'sliders'|'promocions',
        termino: string
        ){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( (resp: any) => {
          switch(tipo) {
              case 'users':
                return this.trasnformarUsuarios(resp.resultados)

              case 'categories':
                return this.trasnformarCategorias(resp.resultados)
              case 'productos':
                return this.trasnformarProductos(resp.resultados)

              case 'marcas':
                return this.trasnformarMarcas(resp.resultados)
              case 'cursos':
                return this.trasnformarCursos(resp.resultados)
              case 'sliders':
                return this.trasnformarSliders(resp.resultados)
              case 'promocions':
                return this.trasnformarPromocions(resp.resultados)


              default:
                return[];
          }
        })
      )
  }


  searchGlobal(termino: string){
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<any[]>(url, this.headers)
  }
}
