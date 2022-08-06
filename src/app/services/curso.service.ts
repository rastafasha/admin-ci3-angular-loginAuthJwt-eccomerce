import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Curso } from '../models/curso.model';
import { Observable } from "rxjs";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CursoService {


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

    const url = `${base_url}api_curso/adminCursos/`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, cursos: Curso[]}) => resp.cursos)
      )

  }


  getCursoById(_id: string){
    const url = `${base_url}api_curso/adminCurso/${_id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, curso: Curso}) => resp.curso)
        );

  }


  crearCurso(curso: Curso){
    const url = `${base_url}api_curso/createCursos`;
    return this.http.post(url, curso, this.headers);
  }

  actualizarCurso(_id:number, curso: Curso){
    const url = `${base_url}api_curso/updateCurso/${curso.id}`;
    return this.http.put(url, curso, this.headers);
  }

  borrarCurso(_id:number){
    const url = `${base_url}api_curso/deleteCurso/${_id}`;
    return this.http.delete(url, this.headers);
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




}