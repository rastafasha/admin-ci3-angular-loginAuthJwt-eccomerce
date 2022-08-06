import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Slider } from '../models/slider.model';

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

    const url = `${base_url}api_slider/adminSliders`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, sliders: Slider[]}) => resp.sliders)
      )

  }


  getSliderById(_id: number){
    const url = `${base_url}api_slider/adminSlider/${_id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, slider: Slider}) => resp.slider)
        );

  }


  crearSlider(slider: Slider){
    const url = `${base_url}api_slider/createSlider/`;
    return this.http.post(url, slider, this.headers);
  }

  actualizarSlider(slider: Slider){
    const url = `${base_url}api_slider/updateSlider/${slider.id}`;
    return this.http.put(url, slider, this.headers);
  }

  borrarSlider(_id:number){
    const url = `${base_url}api_slider/deleteSlider/${_id}`;
    return this.http.delete(url, this.headers);
  }



}
