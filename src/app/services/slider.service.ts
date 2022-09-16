import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Slider } from '../models/slider.model';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  serverUrl = environment.baseUrl;

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


  cargarSliders(){

    const url = `${base_url}api_slider/adminSliders`;
    return this.http.get(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, sliders: Slider[]}) => resp.sliders)
      // )

  }


  getSliderById(id: number): Observable<Slider>{
      const url = `${base_url}api_slider/Slider/${id}`;
      return this.http.get<Slider>(url, this.headers)
      // .pipe(
      //   map((resp:{ok: boolean, slider: Slider}) => resp.slider)
      //   );

  }


  crearSlider(slider){
    return this.http.post<any>(this.serverUrl + 'api_slider/createSlider', slider)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_slider/createSlider/`;
    // return this.http.post(url, slider, this.headers);
  }

  actualizarSlider( slider, id:number){
    return this.http.post<any>(this.serverUrl + 'api_slider/updateSlider/' + id, slider)
    .pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_slider/updateSlider/${id}`;
    // return this.http.put(url, slider, this.headers);
  }

  borrarSlider(id:number){
    return this.http.delete(this.serverUrl + 'api_slider/deleteSlider/' + id).pipe(
      catchError(this.handleError)
    );
    // const url = `${base_url}api_slider/deleteSlider/${id}`;
    // return this.http.delete(url, this.headers);
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
