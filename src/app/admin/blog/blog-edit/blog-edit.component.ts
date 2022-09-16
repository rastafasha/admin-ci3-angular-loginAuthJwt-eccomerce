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

import { Blog } from 'src/app/models/blog.model';
import { BlogService } from '../../../services/blog.service';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
  providers:[
    CategoriaService
  ]
})
export class BlogEditComponent implements OnInit {

  public blog:Blog;
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

  public blogForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private modalImagenService: ModalImagenService,
    private blogService: BlogService,
    private router: Router,
    private location: Location,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.usuario = this.usuarioService.user
   }

  ngOnInit() {
    window.scrollTo(0,0);
    this.getCategorias();
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
  }

  iniciarFormulario(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Blog';
      this.blogService.getBlogById(+id).subscribe(
        res => {
          this.blogForm.patchValue({
            title: res.title,
            description: res.description,
            video_review: res.video_review,
            is_featured: res.is_featured,
            is_active: res.is_active,
            category_id: res.category_id,
            imgUrl: res.imgUrl,
            id: res.id,
            user_id: this.usuario.id
          });
          this.imagePath = res.img;
          this.blog = res;
          console.log(this.blog);
        }
      );
    } else {
      this.pageTitle = 'Create Blog';
    }
    this.validaciones();

  }


  validaciones(){
    this.blogForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category_id: ['',Validators.required],
      video_review: [''],
      is_featured: ['0'],
      is_active: ['1'],
      user_id: [this.usuario.id, Validators.required],
      img: [''],
      imgUrl: [''],
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
      this.blogForm.get('img').setValue(file);
    }
  }

  // get title() { return this.blogForm.get('title'); }
  // get description() { return this.blogForm.get('description'); }
  // get video_review() { return this.blogForm.get('video_review'); }
  // get category_id() { return this.blogForm.get('category_id'); }
  // get user_id() { return this.blogForm.get('user_id'); }

  updateBlogForm () {
    const {
      title,
      category_id,
      user_id,
      video_review,
          info_short,
          description,
          is_featured,
          is_active,
     } = this.blogForm.value;
    const formData = new FormData();
    formData.append('title', this.blogForm.get('title').value);
    formData.append('description', this.blogForm.get('description').value);
    formData.append('video_review', this.blogForm.get('video_review').value);
    formData.append('category_id', this.blogForm.get('category_id').value);
    formData.append('user_id', this.blogForm.get('user_id').value);
    formData.append('is_featured', this.blogForm.get('is_featured').value);
    formData.append('is_active', this.blogForm.get('is_active').value);
    formData.append('imgUrl', this.blogForm.get('imgUrl').value);
    formData.append('img', this.blogForm.get('img').value);

    const id = this.blogForm.get('id').value;

    if (id) {
      this.blogService.updateBlog(formData, +id).subscribe(
        resp =>{
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          this.blog = resp;
          this.ngOnInit();
        });

    } else {
      this.blogService.createBlog(formData).subscribe(
        res => {
          if (this.error) {
            Swal.fire('Error', `Hubo un error`, 'warning');
            this.uploadError = res.message;
          } else {
            Swal.fire('Creado', `creado correctamente`, 'success');
            this.router.navigate(['/dashboard/blog']);
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

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'blogs', this.blog.id)
    .then(img => { this.blog.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
