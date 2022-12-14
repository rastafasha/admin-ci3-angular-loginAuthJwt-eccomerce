import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  serverUrl = environment.baseUrl;
  public blog: Blog;

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

  getBlogs() {
    return this.http.get<Blog>(this.serverUrl + 'api_blog/adminBlogs').pipe(
      catchError(this.handleError)
    );
  }

  getBlog(id: number) {
    return this.http.get<Blog>(this.serverUrl + 'api_blog/adminBlog/' + id).pipe(
      catchError(this.handleError)
    );
  }

  getBlogById(id: number): Observable<Blog>{
    const url = `${base_url}api_blog/adminBlog/${id}`;
    return this.http.get<Blog>(url, this.headers)
    .pipe(
      catchError(this.handleError)
    );
      // .pipe(
      //   map((resp:{ok: boolean, curso: Curso}) => resp.curso)
      //   );

  }

  createBlog(blog) {
    return this.http.post<any>(this.serverUrl + 'api_blog/createBlog/', blog)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateBlog(blog, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_blog/updateBlog/' + id, blog)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteBlog(id: number) {
    return this.http.delete(this.serverUrl + 'api_blog/deleteBlog/' + id).pipe(
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
