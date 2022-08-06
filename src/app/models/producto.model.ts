import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;

export class Producto{
  constructor(

        public name: string,
        public price: string,
        public video_review: string,
        public info_short: string,
        public description: string,
        public category_id: number,
        public subcategory: string,
        public marca_id: number,
        public is_featured: boolean,
        public img?: string,
        public id?: number

  ){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}/uploads/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/uploads/productos/${this.img}`;
    }else {
      return `${base_url}/uploads/productos/no-image.jpg`;
    }

  }
}
