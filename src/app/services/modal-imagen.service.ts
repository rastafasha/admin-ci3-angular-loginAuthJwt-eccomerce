import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'users'|'categories' |'marcas' |'productos' | 'configuraciones'|'promocions' |'sliders'|'cursos';
  public id: number;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'users'|'categories' |'marcas' |'productos' | 'configuraciones'|'promocions' |'sliders'|'cursos',
    id: number,
    img: string = 'no-image'
  ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if(img.includes('https')){
      this.img = img;
    }else {
      this.img = `${base_url}media/images/uploads/${tipo}/${img}`;
    }

  }

  cerrarModal(){
    this._ocultarModal = true;
  }

  constructor() { }
}
