import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { CargarUsuario } from '../auth/interfaces/cargar-usuarios.interface';

import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.baseUrl;
const clientIdGoogle = environment.client_idGoogle;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;


  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
    ) {
      this.googleInit();
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get role(){
    return this.usuario.role_id;
  }

  // get uid():string{
  //   return this.usuario.uid || '';
  // }

  get headers(){
    return{
      headers: {
        'Authorization': this.token
      }
    }
  }

  guardarLocalStorage(token: string, user: string){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }


  login(formData: LoginForm){
    return this.http.post(`${base_url}login`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.user);
      })
    )
  }




  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}signup`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.user);
      })
    )
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}renew`, {
      headers: {
        'Authorization': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, first_name, last_name, username, role_id, img='', user_id} = resp.usuario;

        this.usuario = new Usuario(email, google, first_name, last_name, username, role_id, img, user_id);

        this.guardarLocalStorage(resp.token, resp.user);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  actualizarPerfil(data: {email: string, first_name: string, role_id: number}){

    data = {
      ...data,
      role_id: this.usuario.role_id
    }

    return this.http.put(`${base_url}api/updateUser/${this.usuario.user_id}`, data, this.headers);
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');


    this.auth2.signOut().then(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    })
  }

  googleInit(){

    return new Promise<void>((resolve) =>{

      gapi.load('auth2', () =>{
        this.auth2 = gapi.auth2.init({
          client_id: clientIdGoogle,
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }




  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.user);
      })
    )
  }




  borrarUsuario(usuario: Usuario){
    const url = `${base_url}api/deleteUser/${usuario.user_id}`;
    return this.http.delete(url, this.headers)
  }



  get_user(usuario):Observable<any>{
    const url = `${base_url}user/${usuario.user_id}`;
    return this.http.get(url, this.headers)
  }

  get_users():Observable<any>{
    const url = `${base_url}users`;
    return this.http.get(url, this.headers)
  }

  cargarUsuarios(desde: number = 0){

    const url = `${base_url}api/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map( resp =>{
          const usuarios = resp.usuarios.map(
            user => new Usuario(
              user.first_name,
              user.last_name,
              user.username,
              user.email,
              // user.google,
              // user.img,
              user.role_id,
              user.user_id,
              ));

          return {
            total: resp.total,
            usuarios

          }
        })
      )
  }


    guardarUsuario(usuario: Usuario){
      return this.http.put(`${base_url}api/usuario/${usuario.user_id}`, usuario, this.headers);
    }




}
