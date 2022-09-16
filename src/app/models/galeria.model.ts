import { environment } from "src/environments/environment";
const mediaUrl = environment.mediaUrl;
export class Gallery{
    constructor(
        public id: number,
        public user_id: number,
        public category_id: number,
        public titulo: string,
        public img: string,
        public imgUrl: string,
        public created_at: number,
        public updated_at: number,


    ){
    }

    get imagenUrl(){

      if(!this.img){
        return `${mediaUrl}uploads/gallerys/no-image.jpg`;
      } else if(this.img.includes('https')){
        return this.img;
      } else if(this.img){
        return `${mediaUrl}uploads/gallerys/${this.img}`;
      }else {
        return `${mediaUrl}uploads/gallerys/no-image.jpg`;
      }

    }
}
