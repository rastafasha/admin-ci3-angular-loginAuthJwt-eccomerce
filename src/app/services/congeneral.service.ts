import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Configuracion } from '../models/configuracion.model';
import { Observable } from "rxjs";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CongeneralService {

  public configuracion: Configuracion;

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


  cargarCongenerals(){

    const url = `${base_url}api_configuracion/adminConfiguracions/`;
    return this.http.get(url)
      .pipe(
        map((resp:{ok: boolean, configuracions: Configuracion[]}) => resp.configuracions)
      )


  }


  getCongeneralById(_id: number){
    const url = `${base_url}api_configuracion/adminConfiguracion/${_id}`;
    return this.http.get(url)
      .pipe(
        map((resp:{ok: boolean, configuracion: Configuracion}) => resp.configuracion)
        );


  }


  crearCongeneral(configuracion: Configuracion){
    const url = `${base_url}api_configuracion/createConfiguracion`;
    return this.http.post(url, configuracion);
  }

  actualizarCongeneral(configuracion: Configuracion){
    const url = `${base_url}api_configuracion/updateConfiguracion/${configuracion.id}`;
    return this.http.put(url, configuracion);
  }

  borrarCongeneral(_id:number){
    const url = `${base_url}api_configuracion/deleteConfiguracion/${_id}`;
    return this.http.delete(url);
  }




}
