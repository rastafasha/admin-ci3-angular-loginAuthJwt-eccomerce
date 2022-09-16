import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { environment } from 'src/environments/environment';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

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


  @Input() curso: Curso;

  public cursoForm: FormGroup;
  public category: Categoria;
  public usuario: Usuario;

  public imagenSubir: File;
  public imgTemp: any = null;
  public file :File;
  public imgSelect : String | ArrayBuffer;


  public error: string;
  public uploadError: string;
  public imagePath: string;

  public listCategorias;

  banner: string;
  pageTitle: string;
  pageSubTitle: string;
  cursoActualizado: Curso;
  cursoSeleccionado:Curso;
  id:number;





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
    this.category = categoriaService.category;
    this.curso = cursoService.curso;
    const base_url = environment.baseUrl;
  }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.getCategorias();
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));

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
      this.pageSubTitle = 'Editing';
      this.cursoService.getCursoById(+id).subscribe(
        res => {
          this.cursoForm.patchValue({
            id: res.id,
            user_id: this.usuario.id,
            name: res.name,
            price: res.price,
            cod_prod: res.cod_prod,
            info_short: res.info_short,
            video_review: res.video_review,
            description: res.description,
            category_id: res.category_id,
            is_active: res.is_active,
            is_featured: res.is_featured,
            img: res.img,
            imgUrl: res.imgUrl,
          });

          this.curso = res;
        }
      );
    } else {
      this.pageSubTitle = 'Creating';
    }


    this.validacionesFormulario();

  }

  validacionesFormulario(){
    this.cursoForm = this.fb.group({
      id: [''],
      name: ['',Validators.required],
      price: ['',Validators.required],
      info_short: ['',Validators.required],
      description: ['',Validators.required],
      category_id: ['',Validators.required],
      cod_prod: ['',Validators.required],
      video_review: ['',Validators.required],
      is_active: [''],
      is_featured: [''],
      imgUrl: [''],
      user_id: [this.usuario.id, Validators.required],
      img: [this.imagenSubir],
    })

  }

onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cursoForm.get('img').setValue(file);
    }
  }

  updateCurso(){

    const {
      name,
      category_id,
      cod_prod,
      user_id,
      price,
      video_review,
          info_short,
          description,
          is_featured,
          is_active,
     } = this.cursoForm.value;


     const formData = new FormData();
    formData.append('name', this.cursoForm.get('name').value);
    formData.append('cod_prod', this.cursoForm.get('cod_prod').value);
    formData.append('video_review', this.cursoForm.get('video_review').value);
    formData.append('price', this.cursoForm.get('price').value);
    formData.append('info_short', this.cursoForm.get('info_short').value);
    formData.append('video_review', this.cursoForm.get('video_review').value);
    formData.append('description', this.cursoForm.get('description').value);
    formData.append('category_id', this.cursoForm.get('category_id').value);
    formData.append('user_id', this.cursoForm.get('user_id').value);
    formData.append('is_featured', this.cursoForm.get('is_featured').value);
    formData.append('is_active', this.cursoForm.get('is_active').value);
    formData.append('img', this.cursoForm.get('img').value);

     const id = this.cursoForm.get('id').value;

    if(id){
      //actualizar
      // const data = {
      //   ...this.cursoForm.value,
      //   user_id: this.usuario.id,
      //   // id: this.curso.id
      // }
      this.cursoService.actualizarCurso(formData, +id).subscribe(

        resp =>{
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          this.cursoActualizado = resp;
          this.ngOnInit();
        });

    }else{
      //crear
      this.cursoService.crearCurso(formData)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/curso`)
        resp = this.cursoActualizado;
          console.log(resp);
      })
    }

    // console.log(this.cursoForm.value);

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
    .actualizarFoto(this.imagenSubir, 'cursos', this.curso.id)
    .then(img => { this.curso.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



}
