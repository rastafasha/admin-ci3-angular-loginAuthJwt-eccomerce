import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria.model';
import { IconosService } from 'src/app/services/iconos.service';

@Component({
  selector: 'app-cat-edit',
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.css'],
  providers: [IconosService]
})
export class CatEditComponent implements OnInit {


  public categoriaForm: FormGroup;
  public categoria: Categoria;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  banner: string;
  pageTitle: string;
  listIcons;
  state_banner:boolean;
  id:string;
  categoriaResp: Categoria;

  public categoriaSeleccionado: Categoria;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private usuarioService: UsuarioService,
    private _iconoService: IconosService,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.baseUrl;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);

    this.activatedRoute.params.subscribe( ({id}) => this.cargarCategoria(id));
    this.validacionesFormulario();


    if(this.categoriaSeleccionado.id){
      //actualizar
      this.pageTitle = 'Edit Category';

    }else{
      //crear
      this.pageTitle = 'Create Category';
    }


  }

    /**
   * @method: Permite obtener los datos del form y sus validaciones
   * @author: malcolm
   * @since: 24/07/2022
   */

     validacionesFormulario(){
      this.categoriaForm = this.fb.group({
        nombre: ['', Validators.required],
        subcategorias: ['', Validators.required],
        state_banner: ['', Validators.required],
        img: ['']
      });
    }

  cargarCategoria(_id: string){



    if(_id === 'nuevo'){
      return;
    }

    this.categoriaService.getCategoriaById(this.categoria.id)
    .pipe().subscribe( categoria =>{

      if(!categoria){
        return this.router.navigateByUrl(`/dasboard/categoria`);
      }

      this.categoriaService.getCategoriaById(this.categoria.id).subscribe(
        res => {
          this.categoriaForm.patchValue({
            category_name: res.category_name,
            subcategorias: res.subcategorias,
            state_banner: res.state_banner,
            img: this.categoriaSeleccionado.img
          });
          // this.img = this.categoriaSeleccionado.img;
        }
      );

      // const { nombre, subcategorias, icono, state_banner } = categoria;
      this.categoriaSeleccionado = categoria;
      // this.categoriaForm.setValue({nombre, subcategorias, icono, state_banner});

    });

  }



  // iniciarFormulario(id:string){
  //   // const id = this.route.snapshot.paramMap.get('id');

  //   id = this.categoriaSeleccionado._id;

  //   if (id !== null && id !== undefined) {
  //     this.pageTitle = 'Editar Category';
  //     this.categoriaService.list_one(id).subscribe(
  //       res => {
  //         this.categoriaForm.patchValue({
  //           id: res._id,
  //           nombre: res.nombre,
  //           subcategorias: res.subcategorias,
  //           state_banner: res.state_banner
  //         });
  //         this.imgTemp = this.categoriaSeleccionado.img;
  //       }
  //     );
  //   } else {
  //     this.pageTitle = 'Crear Category';
  //   }

  // }








  updateCategoria(){

    const {category_name, subcategorias,
      state_banner } = this.categoriaForm.value;

      if(this.categoriaSeleccionado){
        //actualizar
        const data = {
          ...this.categoriaForm.value,
          _id: this.categoriaSeleccionado.id
        }
        this.categoriaService.actualizarCategoria(data).subscribe(
          resp =>{

            Swal.fire('Actualizado', `${category_name} ${subcategorias} actualizado correctamente`, 'success');
          });

      }else{
        //crear
        this.categoriaService.crearCategoria(this.categoriaForm.value)
        .subscribe( (resp: any) =>{
          Swal.fire('Creado', `${category_name} creado correctamente`, 'success');
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
    .actualizarFoto(this.imagenSubir, 'categories', this.categoriaSeleccionado.id)
    .then(img => { this.categoriaSeleccionado.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
