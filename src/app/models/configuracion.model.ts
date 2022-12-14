import { environment } from "src/environments/environment";

const base_url = environment.baseUrl;

export class Configuracion{
  constructor(
    public id: number,
    public user_id: number,
    public titulo: string,
    public cr:  string,
    public telefono_uno: string,
    public telefono_dos: string,
    public email_uno: string,
    public email_dos: string,
    public direccion: string,
    public horarios: string,
    public iframe_mapa: string,
    public facebook: string,
    public instagram: string,
    public youtube: string,
    public language: string,
    public twitter: string,
    public logoUrl: string,
    public faviconUrl: string,
    public logo?: string,
    public favicon?: string,

  ){
  }

  get imagenUrl(){

    if(!this.logo){
      return `${base_url}/uploads/congenerals/no-image.jpg`;
    } else if(this.logo.includes('https')){
      return this.logo;
    } else if(this.logo){
      return `${base_url}/uploads/congenerals/${this.logo}`;
    }else {
      return `${base_url}/uploads/congenerals/no-image.jpg`;
    }

  }

  get faviconUrlimage(){

    if(!this.favicon){
      return `${base_url}/uploads/congenerals/no-image.jpg`;
    } else if(this.favicon.includes('https')){
      return this.favicon;
    } else if(this.favicon){
      return `${base_url}/uploads/congenerals/${this.favicon}`;
    }else {
      return `${base_url}/uploads/congenerals/no-image.jpg`;
    }

  }
}
