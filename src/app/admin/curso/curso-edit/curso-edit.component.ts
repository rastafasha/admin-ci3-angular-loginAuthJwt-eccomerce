import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { environment } from 'src/environments/environment';

import { CategoriaService } from 'src/app/services/categoria.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso-edit.component.html',
  styleUrls: ['./curso-edit.component.css'],
  providers:[
    CategoriaService
  ]
})
export class CursoEditComponent implements OnInit {


  public cursoForm: FormGroup;
  public curso: Curso;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public listCategorias;

  banner: string;
  pageTitle: string;

  public cursoSeleccionado: Curso;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private modalImagenService: ModalImagenService,
    private categoriaService: CategoriaService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.baseUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.cargarCurso(id));

    window.scrollTo(0,0);
    this.getCategorias();


    this.cursoForm = this.fb.group({
      name: ['',Validators.required],
      price: ['',Validators.required],
      info_short: ['',Validators.required],
      description: ['',Validators.required],
      category: ['',Validators.required],
      subcategoria: ['',Validators.required],
      video_review: [''],
    })

    if(this.cursoSeleccionado){
      //actualizar
      this.pageTitle = 'Create Curso';

    }else{
      //crear
      this.pageTitle = 'Edit Curso';
    }



  }


  getCategorias(){
    this.categoriaService.cargarCategorias().subscribe(
      resp =>{
        this.listCategorias = resp;
        console.log(this.listCategorias)

      }
    )
  }

  cargarCurso(_id: string){

    if(_id === 'nuevo'){
      return;
    }

    this.cursoService.getCursoById(_id)
    .pipe(
      // delay(100)
      )
      .subscribe( curso =>{


      if(!curso){
        return this.router.navigateByUrl(`/dasboard/curso`);
      }

        const { name, price,info_short,description, category_id, subcategory,
          video_review, } = curso;
        this.cursoSeleccionado = curso;
        this.cursoForm.setValue({
          name, price,info_short,description, category_id, subcategory,
      video_review,
        });

      });

  }





  updateCurso(){debugger

    const {name, price,info_short,description, category_id, subcategory,
      video_review, } = this.cursoForm.value;

    if(this.cursoSeleccionado){
      //actualizar
      const data = {
        ...this.cursoForm.value,
        _id: this.cursoSeleccionado.id
      }
      this.cursoService.actualizarCurso(this.curso.id, this.curso).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${name}  actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.cursoService.crearCurso(this.cursoForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${name} creado correctamente`, 'success');
        // this.router.navigateByUrl(`/dashboard/marca/${resp.marca._id}`)
      })
    }

  }


  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'cursos', this.cursoSeleccionado.id)
    .then(img => { this.cursoSeleccionado.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
