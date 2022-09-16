import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  public url;
  // rapidapiK = environment.rapidapiKey;
  // rapidapiH = environment.rapidapiHost;
  // clientIdPaypal = environment.clientIdPaypal;
  // sandboxPaypal = environment.sandboxPaypal;

  constructor(
    private _http : HttpClient
  ) {
    this.url = environment.baseUrl;
    this.url = environment.baseUrl;

  }

  registro(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'api_venta/createVenta',data,{headers:headers});
  }

  listar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'api_venta/adminVenta'+id,{headers:headers});
  }

  detalle(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'api_venta/adminVenta/'+id,{headers:headers});
  }

  finalizar(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/ventas/venta_finalizar/venta/'+id,{headers:headers});
  }

  update_envio(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'api_venta/updateVenta/'+id,{headers:headers});
    // return this._http.get(this.url+'api_venta/ventas/venta_enviado/updateVenta/'+id,{headers:headers});
  }

  evaluar_cancelacion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'api_venta/ventas/cancelacion_evaluar/venta/'+id,{headers:headers});
  }

  reembolsar(id,idticket):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/ventas/cancelacion_send/reembolsar/'+id+'/'+idticket,{headers:headers});
  }


  cancelar(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'/ventas/cancelacion_send/cancelar',data,{headers:headers});
  }

  denegar(id,idticket):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/ventas/cancelacion_send/denegar/'+id+'/'+idticket,{headers:headers});
  }

  listar_cancelacion(wr):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/ventas/get_cancelacion_admin/data/'+wr,{headers:headers});
  }

  get_cancelacion(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/ventas/get_one_cancelacion_admin/one/'+id,{headers:headers});
  }

  // get_token():Observable<any>{
  //   let headers = new HttpHeaders({
  //     'Accept': 'application/json',
  //     'Content-Type':'application/x-www-form-urlencoded',
  //     'Authorization': 'Basic ' + btoa(`${this.clientIdPaypal}:${this.sandboxPaypal}`),
  //     // 'Authorization': 'Basic ' + btoa('AVTHn-IitbqsInQ7Y_Ald2kPSvEjTd3RRm_OevRxyzv_tXo7XskvFK6w2IxFuZLeKSXWUqoDg_JdWu5V:AXlazeNsZ0CmjfJIronSzcqzw4hLHkcoVEM5fO5BY7AbD-_GhKoKezRcavq6-T4kQuRqaTXFB_VXmheG'),
  //   });
  //   return this._http.post('https://api.sandbox.paypal.com/v1/oauth2/token','grant_type=client_credentials',{headers:headers});
  // }

  set_reembolso(token,id):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this._http.post('https://api.sandbox.paypal.com/v1/payments/capture/'+id+'/refund',{},{headers:headers});
  }

  // track(number){
  //   let headers = new HttpHeaders()
  //   .set('x-rapidapi-host', this.rapidapiH)
  //   .set("x-rapidapi-key", this.rapidapiK)
  //   .set("useQueryString", "true");
  //   return this._http.get('https://apidojo-17track-v1.p.rapidapi.com/track?timeZoneOffset=0&codes='+number,{headers:headers});
  // }

  get_cancelacion_venta(id):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/ventas/cancelacion_venta/obtener_data/'+id,{headers:headers});
  }

  evaluar_venta_user(user,producto):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/ventas/evaluar_venta/data/'+user+'/'+producto,{headers:headers});
  }

  get_data_venta_admin(search,orden,tipo):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/ventas/venta_admin/listar/'+search+'/'+orden+'/'+tipo,{headers:headers});
  }

  set_track(id,data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'/ventas/venta_track/set/'+id,data,{headers:headers});
  }

  get_data_dashboard():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'api_venta/adminVentas',{headers:headers});
    // return this._http.get(this.url+'api_venta//ventas/venta_data/dashboard',{headers:headers});
  }

  get_detalle_hoy():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'api_venta/adminVentas',{headers:headers});
    // return this._http.get(this.url+'/ventas/venta_data/detalles/hoy',{headers:headers});
  }

  init_data_admin():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'/ventas/venta_admin_init/init_data',{headers:headers});
  }
}
