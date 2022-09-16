import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../environments/environment';

import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { CargarUsuario } from '../auth/interfaces/cargar-usuarios.interface';

import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Role, Usuario } from '../models/usuario.model';
import { Location } from '@angular/common';

const base_url = environment.baseUrl;
const clientIdGoogle = environment.client_idGoogle;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  serverUrl = environment.baseUrl;
  private usuarioRegistrado: RegisterForm;

  public auth2: any;
  public user: Usuario;
  public usuariologin;


  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private location: Location,
    ) {
      this.googleInit();
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get role(){
    return this.user.role_id;
  }

  // get uid():string{
  //   return this.user.id || '';
  // }

  get headers(){
    return{
      headers: {
        'Authorization': this.token
      }
    }
  }

  guardarLocalStorage(
    token: string,
    user: string
    ){

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }


  login(formData: LoginForm){


    return this.http.post(`${base_url}login`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(
          resp.token,
          resp.user
          // resp.user = this.usuariologin
          );
          // this.usuariologin = this.validarToken();
      }),
      )

  }




  crearUsuario(user){
    return this.http.post(`${base_url}signup`, user)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(
          resp.token,
          resp.user
          );
      })
    )
  }


  validarToken(): Observable<boolean>{debugger

    return this.http.get(`${base_url}renew`, {
      headers: {
        'Authorization': this.token
      }
    }).pipe(
      map((resp: any) => {
        const {

          first_name,
          last_name,
          email,
          role_id,
          username,
          google,
          img,
          imgUrl,
        } = resp.user;

        this.user = new Usuario(

          first_name,
          last_name,
          email,
          role_id,
          username,
          google,
          img,
          imgUrl,
        );

        this.guardarLocalStorage(resp.token,resp.user);
          return true;
        }),
        catchError(error => of(false))
        );
  }

  // actualizarPerfil(data: {email: string, first_name: string, role_id: number}){

  //   data = {
  //     ...data,
  //     role_id: this.user.role_id
  //   }

  //   return this.http.put(`${base_url}api/updateUser/${this.user.id}`, data, this.headers);
  // }

  actualizarPerfil(user, id: number){

    user = {
      ...user,
      role_id: this.user.role_id
    }
    return this.http.post<any>(this.serverUrl + 'api/updateUser/' + id, user)
    .pipe(
      catchError(this.handleError)
    );
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    if(this.user.google){
      this.auth2.signOut().then(()=>{
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/login');
        })
      })

    }

    location.reload();
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
        this.guardarLocalStorage(
          resp.token,
          resp.user
          );
      })
    )
  }




  borrarUsuario(usuario: Usuario){
    const url = `${base_url}api/deleteUser/${usuario.id}`;
    return this.http.delete(url, this.headers)
  }



  // get_user(usuario):Observable<any>{
  //   const url = `${base_url}api/user/${usuario.id}`;
  //   return this.http.get(url, this.headers)
  // }

  get_user(id: number) {
    return this.http.get<Usuario>(this.serverUrl + 'api/user/' + id).pipe(
      catchError(this.handleError)
    );
  }



  // get_users():Observable<any>{
  //   const url = `${base_url}api/users`;
  //   return this.http.get(url)
  //     // .pipe(
  //     //   map((resp:{ok: boolean, users: Usuario[]}) => resp.users)
  //     // )
  // }

  get_users() {
    return this.http.get<Usuario>(this.serverUrl + 'api/users').pipe(
      catchError(this.handleError)
    );
  }

  cargarUsuarios(desde: number = 0){

    const url = `${base_url}api/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map( resp =>{
          const usuarios = resp.usuarios.map(
            user => new Usuario(
              user.id,
              user.first_name,
              user.last_name,
              user.email,
              user.role_id,
              user.username,
              user.imgUrl,
              user.google,
              user.img,
              // user.terminos,
              ));

          return {
            total: resp.total,
            usuarios

          }
        })
      )
  }


    guardarUsuario(usuario, id: number){
      return this.http.post(`${base_url}api/updateUser/${id}`, usuario);
    }


    getRoles(){

      const url = `${base_url}api_role/adminRoles/`;
      return this.http.get(url, this.headers)
        .pipe(
          map((resp:{ok: boolean, roles: Role[]}) => resp.roles)
        )

    }


    getRole(id: number){
      const url = `${base_url}api_role/adminRole/${id}`;
      return this.http.get(url, this.headers)
        .pipe(
          map((resp:{ok: boolean, role: Role}) => resp.role)
          );

    }


    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened. Please try again later.');
    }



}
