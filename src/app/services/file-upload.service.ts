import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'users'|'categories' |'marcas' |'productos' | 'configuraciones'| 'promocions' | 'sliders' |'cursos',
    id: number
  ){

    try{

      const url = `${base_url}media/images/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url,{
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if(data.ok){
        return data.nombreArchivo;

      }else{
        console.log(data.msg);
        return false;

      }

    }catch(error){
      console.log(error);
      return false;
    }

  }

}
