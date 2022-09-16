import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/models/page.model';



@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css'],
  providers:[
    CategoriaService
  ]
})
export class PageEditComponent implements OnInit {

  public page:Page;
  public usuario: Usuario;
  public category: Categoria;

  public cargando: boolean = true;

  public imgSelect : String | ArrayBuffer;
  public imagenSubir: File;
  public imgTemp: any = null;
  public listCategorias;

  public pageTitle: string;
  public error: string;
  public uploadError: string;
  public imagePath: string;

  public pageForm: FormGroup;

  pageSeleccionado:Page;



  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private modalImagenService: ModalImagenService,
    private pageService: PageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.usuario = this.usuarioService.user;
    this.category = categoriaService.category;
    this.page = pageService.page;
   }

  ngOnInit() {

    this.getCategorias();
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
  }

  iniciarFormulario(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Editing ';
      this.pageService.getPageById(+id).subscribe(
        res => {
          this.pageForm.patchValue({
            id: res.id,
            category_id: res.category_id,
            title: res.title,
            description: res.description,
            video_review: res.video_review,
            is_featured: res.is_featured,
            is_active: res.is_active,
            imgUrl: res.imgUrl,
            user_id: this.usuario.id,
            img : res.img
          });

          this.page = res;
          // console.log(this.page);
        }
      );
    } else {
      this.pageTitle = 'Creating';
    }
    this.validaciones();

  }


  validaciones(){
    this.pageForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category_id: ['',Validators.required],
      video_review: [''],
      imgUrl: [''],
      is_featured: ['0'],
      is_active: ['1'],
      user_id: [this.usuario.id, Validators.required],
      img: [''],
    });
  }

  getCategorias(){
    this.categoriaService.cargarCategorias().subscribe(
      resp =>{
        this.listCategorias = resp;
        console.log(this.listCategorias)

      }
    )
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pageForm.get('img').setValue(file);
    }
  }

  get title() { return this.pageForm.get('title'); }
  get description() { return this.pageForm.get('description'); }
  get video_review() { return this.pageForm.get('video_review'); }
  get category_id() { return this.pageForm.get('category_id'); }
  get user_id() { return this.pageForm.get('user_id'); }

  updatePageForm (pageForm) {
    const formData = new FormData();
    formData.append('title', this.pageForm.get('title').value);
    formData.append('description', this.pageForm.get('description').value);
    formData.append('video_review', this.pageForm.get('video_review').value);
    formData.append('category_id', this.pageForm.get('category_id').value);
    formData.append('user_id', this.pageForm.get('user_id').value);
    formData.append('is_featured', this.pageForm.get('is_featured').value);
    formData.append('is_active', this.pageForm.get('is_active').value);
    formData.append('imgUrl', this.pageForm.get('imgUrl').value);
    formData.append('img', this.pageForm.get('img').value);

    const id = this.pageForm.get('id').value;

    if (id) {
      this.pageService.updatePage(formData, +id).subscribe(
        res => {
          if (this.error) {
            Swal.fire('Error', `Hubo un error`, 'warning');
            this.uploadError = res.message;
          } else {
            Swal.fire('Actualizado', `actualizado correctamente`, 'success');
            // this.router.navigate(['/dashboard/page']);
            this.ngOnInit();
          }
        },
        error => this.error = error
      );
    } else {
      this.pageService.createPage(formData).subscribe(
        res => {
          if (this.error) {
            Swal.fire('Error', `Hubo un error`, 'warning');
            this.uploadError = res.message;
          } else {
            Swal.fire('Creado', `creado correctamente`, 'success');
            this.router.navigate(['/dashboard/page']);
          }
        },
        error => this.error = error
      );
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

  subirImagen(){debugger

    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'pages', this.page.id)
    .then(img => { this.page.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
