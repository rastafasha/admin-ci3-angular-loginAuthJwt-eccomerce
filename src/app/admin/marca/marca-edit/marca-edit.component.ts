import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';


@Component({
  selector: 'app-marca-edit',
  templateUrl: './marca-edit.component.html',
  styleUrls: ['./marca-edit.component.css']
})
export class MarcaEditComponent implements OnInit {


  public marcaForm: FormGroup;
  public marca: Marca;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  pageTitle: string;

  public marcaSeleccionado: Marca;
  id:number;

  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.usuario = usuarioService.user;
    const base_url = environment.baseUrl;
  }

  ngOnInit(): void {

    window.scrollTo(0,0);

    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
    this.validacionesFormulario();
  }

   /**
   * @method: Permite obtener los datos del form y sus validaciones
   * @author: malcolm
   * @since: 24/07/2022
   */

    validacionesFormulario(){
      this.marcaForm = this.fb.group({
        marca_name: [''],
        img: ['']
      })
    }

  iniciarFormulario(id:number){


    if (id !== null && id !== undefined) {
      this.pageTitle = 'Editar Marca';
      this.marcaService.getMarcaById(id).subscribe(
        res => {
          this.marcaForm.patchValue({
            id: res.id,
            marca_name: res.marca_name
          });
        }
      );
    } else {
      this.pageTitle = 'Crear Marca';
    }

  }

  get marca_name() { return this.marcaForm.get('marca_name'); }


  updateMarca(){

    const {marca_name } = this.marcaForm.value;

    const formData = new FormData();
    formData.append('marca_name', this.marcaForm.get('marca_name').value);
    const id = this.marcaForm.get('id').value;

    if(id){
      //actualizar
      // const data = {
      //   ...this.marcaForm.value,
      //   id: this.marcaSeleccionado.id
      // }
      this.marcaService.actualizarMarca(formData, +id).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${marca_name}  actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.marcaService.crearMarca(formData)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${marca_name} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/marca`)
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
    .actualizarFoto(this.imagenSubir, 'marcas', this.marca.id)
    .then(img => { this.marcaSeleccionado.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
