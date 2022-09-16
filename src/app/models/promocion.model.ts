import { environment } from "src/environments/environment";

const base_url = environment.mediaUrl;
export class Promocion {
  constructor(
    public producto_title: string,
    public first_title: string,
    public subtitulo: string,
    public description: string,
    public enlace	: string,
    public boton: string,
    public target: string,
    public is_active: boolean,
    public is_activeText: string,
    public is_activeBot: string,
    public updated_at: Date,
    public created_at: Date,
    public imgUrl: string,
    public img?: string,
    public id?: number
  ){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}uploads/promocions/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}uploads/promocions/${this.img}`;
    }else {
      return `${base_url}uploads/promocions/no-image.jpg`;
    }

  }




}
