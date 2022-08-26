import { environment } from "src/environments/environment";

const base_url = environment.mediaUrl;

export class Curso{
  constructor(

        public name: string,
        public price: string,
        public video_review: string,
        public info_short: string,
        public description: string,
        public category_id: number,
        public is_featured: boolean,
        public is_active: boolean,
        public updated_at: Date,
        public created_at: Date,
        public id: number,
        public user_id: number,
        public img?: string,

  ){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}uploads/cursos/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}uploads/cursos/${this.img}`;
    }else {
      return `${base_url}uploads/cursos/no-image.jpg`;
    }

  }
}
