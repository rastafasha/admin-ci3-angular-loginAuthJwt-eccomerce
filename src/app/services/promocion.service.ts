import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Promocion } from '../models/promocion.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PromocionService {


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


  cargarPromocions(){

    const url = `${base_url}api_promocion/adminPromocions/`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, promocions: Promocion[]}) => resp.promocions)
      )

  }


  getPromocionById(_id: number){
    const url = `${base_url}api_promocion/adminPromocion/${_id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, promocion: Promocion}) => resp.promocion)
        );

  }


  crearPromocion(promocion: Promocion){
    const url = `${base_url}api_promocion/createPromocion/`;
    return this.http.post(url, promocion, this.headers);
  }

  actualizarPromocion(promocion: Promocion){
    const url = `${base_url}api_promocion/updatePromocion/${promocion.id}`;
    return this.http.put(url, promocion, this.headers);
  }

  borrarPromocion(_id:number){
    const url = `${base_url}api_promocion/deletePromocion/${_id}`;
    return this.http.delete(url, this.headers);
  }



}
