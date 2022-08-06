import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;
export class Marca {
  constructor(
    public marca_name: string,
    public img?: string,
    public id?: number
  ){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}/uploads/marcas/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/uploads/marcas/${this.img}`;
    }else {
      return `${base_url}/uploads/marcas/no-image.jpg`;
    }

  }




}
