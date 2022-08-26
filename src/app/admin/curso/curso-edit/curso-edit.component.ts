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
    this.usuario = usuarioService.user;
    const base_url = environment.baseUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));

    window.scrollTo(0,0);
    this.getCategorias();


    this.cursoForm = this.fb.group({
      name: ['',Validators.required],
      price: ['',Validators.required],
      info_short: ['',Validators.required],
      description: ['',Validators.required],
      category_id: ['',Validators.required],
      video_review: [''],
      is_featured: [''],
      is_active: [''],
      user_id: [this.usuario.id, Validators.required],
    })

    if(this.cursoSeleccionado){
      //actualizar
      this.pageTitle = 'Edit Curso';

    }else{
      //crear
      this.pageTitle = 'Create Curso';
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


  iniciarFormulario(id:number){


    if (id !== null && id !== undefined) {
      this.pageTitle = 'Editar Curso';
      this.cursoService.getCursoById(id).subscribe(
        res => {
          this.cursoForm.patchValue({
            id: res.id,
            user_id: this.usuario.id,
            name: res.name,
            price: res.price,
            info_short: res.info_short,
            video_review: res.video_review,
            description: res.description,
            category_id: res.category_id,
            is_active: res.is_active,
            is_featured: res.is_featured,
          });
        }
      );
    } else {
      this.pageTitle = 'Crear Curso';
    }

  }





  updateCurso(){debugger

    const {
      name,
          price,
          user_id,
          video_review,
          info_short,
          description,
          category_id,
          is_featured,
          is_active,
     } = this.cursoForm.value;

    if(this.cursoSeleccionado){
      //actualizar
      const data = {
        ...this.cursoForm.value,
        user_id: this.usuario.id,
        id: this.cursoSeleccionado.id
      }
      this.cursoService.actualizarCurso(this.curso.id).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${name}  actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.cursoService.crearCurso(this.cursoForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${name} creado correctamente`, 'success');
        // this.router.navigateByUrl(`/dashboard/marca/${resp.marca.id}`)
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
