import { Injectable } from '@angular/core';
import { Page } from '../models/page.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PageService {

  serverUrl = environment.baseUrl;
  public page: Page;

  constructor(private http: HttpClient) { }

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

  getPages() {
    return this.http.get<Page>(this.serverUrl + 'api_page/adminPages').pipe(
      catchError(this.handleError)
    );
  }

  getPage(id: number) {
    return this.http.get<Page>(this.serverUrl + 'api_page/adminPage/' + id).pipe(
      catchError(this.handleError)
    );
  }

  getPageById(id: number): Observable<Page>{
    const url = `${base_url}api_page/adminPage/${id}`;
    return this.http.get<Page>(url, this.headers)
    .pipe(
      catchError(this.handleError)
    );
      // .pipe(
      //   map((resp:{ok: boolean, curso: Curso}) => resp.curso)
      //   );

  }

  createPage(page) {
    return this.http.post<any>(this.serverUrl + 'api_page/createPage/', page)
    .pipe(
      catchError(this.handleError)
    );
  }

  updatePage(page, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_page/updatePage/' + id, page)
    .pipe(
      catchError(this.handleError)
    );
  }

  deletePage(id: number) {
    return this.http.delete(this.serverUrl + 'api_page/deletePage/' + id).pipe(
      catchError(this.handleError)
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
