import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Marca } from '../models/marca.model';
import { Observable } from 'rxjs/internal/Observable';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MarcaService {


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


  crearMarca(marca: Marca){
    const url = `${base_url}api_marca/createMarca/`;
    return this.http.post(url, marca, this.headers);
  }

  actualizarMarca(id){
    const url = `${base_url}api_marca/updateMarca/${id}`;
    return this.http.put(url, id, this.headers);
  }

  borrarMarca(id:number){
    const url = `${base_url}api_marca/deleteMarca/${id}`;
    return this.http.delete(url, this.headers);
  }



}
