import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';
import { Gallery } from "../models/galeria.model";
import { catchError, map } from 'rxjs/operators';

const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  serverUrl = environment.baseUrl;

  public gallery: Gallery;

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


  createPhotGallery(data):Observable<any>{
    const url = `${base_url}api_gallery/createGallery/`;
    return this.http.post(url, data, this.headers);
  }



  getGallerys():Observable<any>{
    const url = `${base_url}api_gallery/adminGallerys/`;
    return this.http.get(url, this.headers);
    }


    getGalleryById(id: number): Observable<Gallery>{
      const url = `${base_url}api_gallery/adminGallery/${id}`;
      return this.http.get<Gallery>(url, this.headers)
      .pipe(
        catchError(this.handleError)
      );
        // .pipe(
        //   map((resp:{ok: boolean, curso: Curso}) => resp.curso)
        //   );

    }

    updatePHotoGallery(gallery, id: number) {
      return this.http.post<any>(this.serverUrl + 'api_gallery/updateGallery/' + id, gallery)
      .pipe(
        catchError(this.handleError)
      );
    }

    updatePhoto(gallery, id: number) {
      return this.http.post<any>(this.serverUrl + 'api_gallery/updateGalleryPhoto/' + id, gallery)
      .pipe(
        catchError(this.handleError)
      );
    }

  eliminarPhotoGallery(id):Observable<any>{
    const url = `${base_url}api_gallery/deleteGallerys/${id}`;
    return this.http.delete(url, this.headers);
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
