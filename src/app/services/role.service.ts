import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Role } from '../models/role.model';
import { Observable, throwError } from "rxjs";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  serverUrl = environment.baseUrl;
  public role: Role;

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


  cargarRoles(){

    const url = `${base_url}roles`;
    return this.http.get(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, categorias: Categoria[]}) => resp.categorias)
      // )

  }



  getRoleById(id: number): Observable<Role>{
    const url = `${base_url}role/${id}`;
    return this.http.get<Role>(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, categoria: Categoria}) => resp.categoria)
      //   );

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
