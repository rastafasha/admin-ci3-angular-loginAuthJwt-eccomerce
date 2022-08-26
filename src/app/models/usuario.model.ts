import { environment } from "src/environments/environment";

const mediaUrl = environment.mediaUrl;
export class Usuario {
  constructor(
    public first_name: string,
    public last_name: string,
    public username: string,
    public email: string,
    public role_id: number,
    public id: number,
    // public uid?: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
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
