import { environment } from "src/environments/environment";

const mediaUrl = environment.mediaUrl;
export class Usuario {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public email: string,
    public role_id: number,
    public username: string,
    public imgUrl: string,
    public google?: boolean,
    public uid?: string,
    public password?: string,
    public terminos?: boolean,
    public img?: string,
  ){}

  get imagenUrl(){

    if(!this.img){
      return `${mediaUrl}uploads/users/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${mediaUrl}uploads/users/${this.img}`;
    }else {
      return `${mediaUrl}uploads/users/no-image.jpg`;
    }

  }




}


export class Role {
  constructor(
    public role_name: string,
    public status: boolean,
    public id: number,
  ){}




}
