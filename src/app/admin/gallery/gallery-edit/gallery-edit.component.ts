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
import { GalleryService } from 'src/app/services/galeria.service';
import { Gallery } from 'src/app/models/galeria.model';



@Component({
  selector: 'app-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.css']
})
export class GalleryEditComponent implements OnInit {

  public gallery:Gallery;
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
  public img: string;

  public galleryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private modalImagenService: ModalImagenService,
    private galleryService: GalleryService,
    private router: Router,
    private location: Location,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {
    this.usuario = this.usuarioService.user
   }

   ngOnInit() {

    this.getCategorias();
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));


  }

  iniciarFormulario(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Gallery';
      this.galleryService.getGalleryById(+id).subscribe(
        res => {
          this.galleryForm.patchValue({
            category_id: res.category_id,
            id: res.id,
            titulo: res.titulo,
            imgUrl: res.imgUrl,
            user_id: this.usuario.id
          });
          this.img = res.img;

          this.gallery = res;
        }
      );
    } else {
      this.pageTitle = 'Create Gallery';
    }
    this.validaciones();

  }


  validaciones(){
    this.galleryForm = this.fb.group({
      id: [''],
      titulo: [''],
      category_id: ['',Validators.required],
      user_id: [this.usuario.id, Validators.required],
      img: [this.img],
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
      this.galleryForm.get('img').setValue(file);
    }
  }

  get titulo() { return this.galleryForm.get('titulo'); }
  get category_id() { return this.galleryForm.get('category_id'); }
  get user_id() { return this.galleryForm.get('user_id'); }

  updateGalForm () {


    const {titulo, category_id, user_id, img} = this.galleryForm.value

    const formData = new FormData();
    formData.append('titulo', this.galleryForm.get('titulo').value);
    formData.append('category_id', this.galleryForm.get('category_id').value);
    formData.append('user_id', this.galleryForm.get('user_id').value);
    formData.append('imgUrl', this.galleryForm.get('imgUrl').value);
    formData.append('img', this.galleryForm.get('img').value);


    const id = this.galleryForm.get('id').value;

    if (id) {
      this.galleryService.updatePHotoGallery(formData, +id).subscribe(
        res => {
          if (this.error) {
            Swal.fire('Error', `Hubo un error`, 'warning');
            this.uploadError = res.message;
          } else {
            Swal.fire('Actualizado', `actualizado correctamente`, 'success');
            this.router.navigate(['/dashboard/gallery']);
          }
        },
        error => this.error = error
      );
    } else {
      this.galleryService.createPhotGallery(formData).subscribe(
        res => {
          if (this.error) {
            Swal.fire('Error', `Hubo un error`, 'warning');
            this.uploadError = res.message;
          } else {
            Swal.fire('Creado', `creado correctamente`, 'success');
            this.router.navigate(['/dashboard/gallery']);
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

  subirImagen(id: number){
    this.galleryService
    .updatePhoto(this.imagenSubir.name, +id).subscribe(
      res=>{
        if (this.error) {
          Swal.fire('Error', `Hubo un error`, 'warning');
          this.uploadError = res.message;
        } else {
          // Swal.fire('Creado', `creado correctamente`, 'success');
          this.img = res;
        }
      }
    )
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
