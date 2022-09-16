import { Component, OnInit } from '@angular/core';
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

import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-prod-edit',
  templateUrl: './prod-edit.component.html',
  styleUrls: ['./prod-edit.component.css'],
  providers:[
    CategoriaService
  ]
})
export class ProdEditComponent implements OnInit {


  public productoForm: FormGroup;
  public producto: Producto;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public listCategorias;

  banner: string;
  pageTitle: string;
  category: Categoria;
  id:number;

  public productoSeleccionado: Producto;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
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
    this.category = categoriaService.category;
    this.producto = productoService.producto;
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
      this.pageTitle = 'Editing';
      this.productoService.getProductoById(+id).subscribe(
        res => {
          this.productoForm.patchValue({
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
          });
          this.producto = res;
        }
      );
    } else {
      this.pageTitle = 'Creating';
    }

    this.validacionesFormulario();

  }

    /**
   * @method: Permite obtener los datos del form y sus validaciones
   * @author: malcolm
   * @since: 22/08/2022
   */

     validacionesFormulario(){
      this.productoForm = this.fb.group({
        id: [''],
        name: ['',Validators.required],
        price: ['',Validators.required],
        info_short: ['',Validators.required],
        description: ['',Validators.required],
        category_id: ['',Validators.required],
        subcategoria: ['',Validators.required],
        cod_prod: ['',Validators.required],
        is_active: [''],
        video_review: [''],
        is_featured: [''],
        user_id: [this.usuario.id, Validators.required],
        // img: [''],
      })
    }

    get name() { return this.productoForm.get('name'); }
    get price() { return this.productoForm.get('price'); }
    get user_id() { return this.productoForm.get('user_id'); }
    get cod_prod() { return this.productoForm.get('cod_prod'); }
    get video_review() { return this.productoForm.get('video_review'); }
    get info_short() { return this.productoForm.get('info_short'); }
    get description() { return this.productoForm.get('description'); }
    get category_id() { return this.productoForm.get('category_id'); }
    get is_featured() { return this.productoForm.get('is_featured'); }
    get is_active() { return this.productoForm.get('is_active'); }

  updateProducto(){debugger

    const {
      name,
      cod_prod,
      category_id,
      user_id,
      price,
      info_short,
      description,
      video_review,
      is_featured,
      is_active,
     } = this.productoForm.value;

     const formData = new FormData();
    formData.append('name', this.productoForm.get('name').value);
    formData.append('cod_prod', this.productoForm.get('cod_prod').value);
    formData.append('video_review', this.productoForm.get('video_review').value);
    formData.append('price', this.productoForm.get('price').value);
    formData.append('info_short', this.productoForm.get('info_short').value);
    formData.append('video_review', this.productoForm.get('video_review').value);
    formData.append('description', this.productoForm.get('description').value);
    formData.append('category_id', this.productoForm.get('category_id').value);
    formData.append('user_id', this.productoForm.get('user_id').value);
    formData.append('is_featured', this.productoForm.get('is_featured').value);
    formData.append('is_active', this.productoForm.get('is_active').value);

     const id = this.productoForm.get('id').value;

    if(id){
      //actualizar
      // const data = {
      //   ...this.productoForm.value,
      //   user_id: this.usuario.id,
      //   // id: this.producto.id
      // }
      this.productoService.actualizarProducto(formData, +id).subscribe(
        resp =>{
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          this.productoSeleccionado = resp;
          console.log(this.productoSeleccionado);
        });

    }else{
      //crear
      this.productoService.crearProducto(formData)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${name} creado correctamente`, 'success');
        // this.router.navigateByUrl(`/dashboard/marca/${resp.marca._id}`)
        this.router.navigateByUrl(`/dashboard/producto`)

      })
    }
    // console.log(this.productoForm.value);
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
    .actualizarFoto(this.imagenSubir, 'productos', this.productoSeleccionado.id)
    .then(img => { this.productoSeleccionado.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
