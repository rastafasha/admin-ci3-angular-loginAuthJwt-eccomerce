import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.mediaUrl

@Pipe({
  name: 'imagenPipe'
})
export class ImagenPipePipe implements PipeTransform {

  transform(img: string, tipo: 'users'|'sliders'|'categorias'|'marcas'|'productos'|'configuracions'
  |'promocions'|'gallerys'|'cursos'): string {

    if(!img){
      return `${base_url}uploads/categorias/no-image.jpg`;
    } else if(img.includes('https')){
      return img;
    } else if(img){
      return `${base_url}uploads/${tipo}/${img}`;
    }else {
      return `${base_url}uploads/marcas/no-image.jpg`;
    }


  }

}
