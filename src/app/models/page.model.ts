import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;

export class Page{

  constructor(

    public id: number,
    public category_id: number,
    public title: string,
        public description: string,
        public author: string,
        public video_review: string,
        public subcategory: string,
        public is_featured: boolean,
        public is_active: boolean,
        public img: string,
        public imgUrl: string,

  ){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}/uploads/pages/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/uploads/pages/${this.img}`;
    }else {
      return `${base_url}/uploads/pages/no-image.jpg`;
    }

  }
}
