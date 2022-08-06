import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public url;

  constructor(
    private _http : HttpClient
  )
  {
    this.url = environment.baseUrl;
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

  registro(data):Observable<any>{
    console.log(data);

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + '/tickets/ticket_registro/registro',data,{headers:headers})
  }

  send(data):Observable<any>{
    console.log(data);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + '/tickets/ticket_msm/send',data,{headers:headers})
  }

  listar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/tickets/ticket_listar/listar/'+id,{headers:headers})


  }

  data(de,para):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/tickets/ticket_chat/chat/'+de+'/'+para,{headers:headers})
  }

  get_ticket(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + '/tickets/ticket_data/one/'+id,{headers:headers})
  }

  get_tickets_admin(){

    const url = `${base_url}/tickets`;
    return this._http.get(url, this.headers)

  }
}
