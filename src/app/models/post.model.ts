import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;

export class Post{
  constructor(

        public title: string,
        public description: string,
        public category_id: number,
        public author: string,
        public video_review: string,
        public subcategory: string,
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
      return `${base_url}/uploads/posts/${this.img}`;
    }else {
      return `${base_url}/uploads/posts/no-image.jpg`;
    }

  }
}
