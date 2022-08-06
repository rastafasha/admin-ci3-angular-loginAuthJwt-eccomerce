import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';
import { Galeria } from "../models/galeria.model";
import { map } from 'rxjs/operators';

const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class GaleriaService {



  constructor(
    private http : HttpClient,
  ) {
  }

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


  find_by_product(id):Observable<any>{
    const url = `${base_url}/galerias/galeria_producto/find/${id}`;
    return this.http.get(url, this.headers);
  }


  registro(data):Observable<any>{
    const url = `${base_url}api_gallery/createGallery/`;
    return this.http.post(url, data, this.headers);
  }



  listar():Observable<any>{
    const url = `${base_url}api_gallery/adminGallerys/`;
    return this.http.get(url, this.headers);
    }


  eliminar(_id):Observable<any>{
    const url = `${base_url}api_gallery/deleteGallerys/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
