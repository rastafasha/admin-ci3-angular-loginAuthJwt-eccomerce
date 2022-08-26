import { Component, Input, OnInit } from '@angular/core';
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


  categoriaForm: FormGroup;
  public categoria: Categoria;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  banner: string;
  pageTitle: string;
  listIcons;
  state_banner:boolean;
  id:number;


  /**
  * Propiedades iput que traen la informacion desde la grilla para editar
  * */

   @Input() category: Categoria;
   @Input() categoryList: Categoria[] = [];
   categoriaSeleccionado: Categoria;
   categoriaId;

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
    this.usuario = usuarioService.user;
    const base_url = environment.baseUrl;
    this.categoriaId = categoriaService.category;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));

  }



/**
  * @method: Permite obtener el id  para editar
  * @author: malcolm
  * @since: 2022-08
  */

 catasignada:any;
 mostrarCategoria:any;

  iniciarFormulario(id:number){debugger


    if (id !== null && id !== undefined) {
      this.pageTitle = 'Editar Category';
      this.categoriaService.getCategoriaById(+id).subscribe(
        res => {
          this.categoriaForm.patchValue({
            id: res.id,
            category_name: res.category_name,
          });
          this.mostrarCategoria = res;
        }
      );
    } else {
      this.pageTitle = 'Crear Category';
    }

    console.log(id);

    this.validacionesFormulario();

  }

      /**
   * @method: Permite obtener los datos del form y sus validaciones
   * @author: malcolm
   * @since: 24/07/2022
   */

       validacionesFormulario(){
        this.categoriaForm = this.fb.group({
          id: [''],
          category_name: ['', Validators.required]
        });
      }

  get category_name() { return this.categoriaForm.get('category_name'); }



  updateCategoria(){debugger



    this.category.id= this.categoriaForm.controls.id.value; //viene de la grilla

    const {category_name} = this.categoriaForm.value;

    const id = this.category.id;

    if(id){
        //actualizar
        const data = {
          ...this.categoriaForm.value
        }


        this.categoriaService.actualizarCategoria(data, this.categoria).subscribe(
          (resp:any) =>{
            this.categoria = resp;

            Swal.fire('Actualizado', `${category_name}  actualizado correctamente`, 'success');
          });

      }else{
        //crear
        this.categoriaService.crearCategoria(this.categoriaForm.value)
        .subscribe( (resp: any) =>{
          this.categoria = resp;
          Swal.fire('Creado', `${category_name} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/categoria`)
        })
      }

  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
