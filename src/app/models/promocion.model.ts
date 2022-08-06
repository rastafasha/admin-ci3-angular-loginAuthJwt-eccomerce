import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;
export class Promocion {
  constructor(
    public producto_title: string,
    public first_title: string,
    public subtitulo: string,
    public enlace: string,
    public is_active: boolean,
    public is_activeText: boolean,
    public is_activeBot: boolean,
    public img?: string,
    public id?: number
  ){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}/uploads/promocions/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/uploads/promocions/${this.img}`;
    }else {
      return `${base_url}/uploads/promocions/no-image.jpg`;
    }

  }




}
