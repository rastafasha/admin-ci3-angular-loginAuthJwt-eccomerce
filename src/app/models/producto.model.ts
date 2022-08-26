import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;

const mediaUrl = environment.mediaUrl;

export class Producto{
  constructor(

        public name: string,
        public price: string,
        public video_review: string,
        public info_short: string,
        public description: string,
        public category_id: number,
        public is_featured: boolean,
        public img?: string,
        public id?: number

  ){}

  get imagenUrl(){

    if(!this.img){
      return `${mediaUrl}uploads/productos/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${mediaUrl}uploads/productos/${this.img}`;
    }else {
      return `${mediaUrl}uploads/productos/no-image.jpg`;
    }

  }
}
