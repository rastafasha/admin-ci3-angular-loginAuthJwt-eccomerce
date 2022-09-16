import { environment } from "src/environments/environment";

const mediaUrl = environment.mediaUrl;

export class Blog {

  constructor(
    public title: string,
    public description: string,
    public category_id: number,
    public video_review: string,
    public imgUrl: string,
    public role_id: number,
    public id: number,
    public created_at: Date,
    public updated_at: Date,
    public is_featured: boolean,
    public is_active: boolean,
    public img?: string,
  ){}

  get imagenUrl(){

    if(!this.img){
      return `${mediaUrl}uploads/blogs/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${mediaUrl}uploads/blogs/${this.img}`;
    }else {
      return `${mediaUrl}uploads/blogs/no-image.jpg`;
    }

  }


}
