import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { environment } from 'src/environments/environment';

import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';


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
    MarcaService,
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
  public listMarcas;
  public listCategorias;

  banner: string;
  pageTitle: string;

  public productoSeleccionado: Producto;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private modalImagenService: ModalImagenService,
    private marcaService: MarcaService,
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
    this.activatedRoute.params.subscribe( ({id}) => this.cargarProducto(id));

    window.scrollTo(0,0);
    this.getMarca();
    this.getCategorias();


    this.productoForm = this.fb.group({
      name: ['',Validators.required],
      price: ['',Validators.required],
      info_short: ['',Validators.required],
      description: ['',Validators.required],
      category: ['',Validators.required],
      subcategoria: ['',Validators.required],
      marca: [''],
      video_review: [''],
    })

    if(this.productoSeleccionado){
      //actualizar
      this.pageTitle = 'Create Producto';

    }else{
      //crear
      this.pageTitle = 'Edit Producto';
    }



  }


  getMarca(){
    this.marcaService.cargarMarcas().subscribe(
      resp =>{
        this.listMarcas = resp;
        console.log(this.listMarcas)

      }
    )
  }
  getCategorias(){
    this.categoriaService.cargarCategorias().subscribe(
      resp =>{
        this.listCategorias = resp;
        console.log(this.listCategorias)

      }
    )
  }

  cargarProducto(_id: string){

    if(_id === 'nuevo'){
      return;
    }

    this.productoService.getProductoById(_id)
    .pipe(
      // delay(100)
      )
      .subscribe( producto =>{


      if(!producto){
        return this.router.navigateByUrl(`/dasboard/producto`);
      }

        const { name, price,info_short,description, category_id, subcategory,
          marca_id,video_review, } = producto;
        this.productoSeleccionado = producto;
        this.productoForm.setValue({
          name, price,info_short,description, category_id, subcategory,
          marca_id,video_review,
        });

      });

  }





  updateProducto(){debugger

    const {name, price,info_short,description, category_id, subcategory,
      marca_id,video_review, } = this.productoForm.value;

    if(this.productoSeleccionado){
      //actualizar
      const data = {
        ...this.productoForm.value,
        _id: this.productoSeleccionado.id
      }
      this.productoService.actualizarProducto(this.producto.id, this.producto).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${name}  actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.productoService.crearProducto(this.productoForm.value)
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
