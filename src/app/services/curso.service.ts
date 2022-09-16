import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Curso } from '../models/curso.model';
import { Observable, throwError } from "rxjs";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  serverUrl = environment.baseUrl;
  public curso: Curso;



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


  cargarCursos(){

    const url = `${base_url}api_curso/adminCursos`;
    return this.http.get(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, cursos: Curso[]}) => resp.cursos)
      // )

  }

  getCurso(id: number) {
    return this.http.get<Curso>(this.serverUrl + 'api_curso/adminCurso/' + id).pipe(
      catchError(this.handleError)
    );
  }


  getCursoById(id: number): Observable<Curso>{
    const url = `${base_url}api_curso/adminCurso/${id}`;
    return this.http.get<Curso>(url, this.headers)
    .pipe(
      catchError(this.handleError)
    );
      // .pipe(
      //   map((resp:{ok: boolean, curso: Curso}) => resp.curso)
      //   );

  }


  crearCurso(curso){
    return this.http.post<any>(this.serverUrl + 'api_curso/createCurso', curso)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_curso/createCurso`;
    // return this.http.post(url, curso, this.headers)

  }

  actualizarCurso(curso, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_curso/updateCurso/' + id, curso)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_curso/updateCurso/`;
    // return this.http.post<Curso>(url,id, this.headers)

  }


  borrarCurso(id:number){
    return this.http.delete(this.serverUrl + 'api_curso/deleteCurso/' + id).pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_curso/deleteCurso/${id}`;
    // return this.http.delete(url, this.headers)
    // .pipe(
    //   catchError(this.handleError)
    // );
  }



  cat_by_name(nombre):Observable<any>{
    const url = `${base_url}/cursos/categoria/name/`+nombre;
    return this.http.get(url,  this.headers);
  }


  listar_cat(filtro):Observable<any>{
    const url = `${base_url}/cursos/producto_admin_cat/cat/`+filtro;
    return this.http.get(url,  this.headers);
  }


  desactivar(id):Observable<any>{
    const url = `${base_url}/cursos/curso_admin/admin/desactivar/`+id;
    return this.http.get(url,  this.headers);
  }

  activar(id):Observable<any>{
    const url = `${base_url}/cursos/curso_admin/admin/activar/`+id;
    return this.http.get(url,  this.headers);
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
