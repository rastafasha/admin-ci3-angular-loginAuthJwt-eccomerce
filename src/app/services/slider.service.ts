import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Slider } from '../models/slider.model';
import { Observable } from 'rxjs/internal/Observable';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SliderService {


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

    const url = `${base_url}api_slider/sliders`;
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


  crearSlider(slider: Slider){
    const url = `${base_url}api_slider/createSlider/`;
    return this.http.post(url, slider, this.headers);
  }

  actualizarSlider(id:number, slider: Slider){
    const url = `${base_url}api_slider/updateSlider/${id}`;
    return this.http.put(url, slider, this.headers);
  }

  borrarSlider(id:number){
    const url = `${base_url}api_slider/deleteSlider/${id}`;
    return this.http.delete(url, this.headers);
  }



}
