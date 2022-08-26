import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from '../../../services/usuario.service';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/models/promocion.model';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-promoedit',
  templateUrl: './promoedit.component.html',
  styleUrls: ['./promoedit.component.css']
})
export class PromoeditComponent implements OnInit {


  public promocionForm: FormGroup;
  public promoSeleccionado: Promocion;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public url;
  public identity;
  public msm_error = false;
  public msm_success = false;
  public promocion : any = {};

  public promocions: Promocion[] =[];

  public imagenSubir: File;
  public imgTemp: any = null;
  pageTitle: string;
  id:number;

  banner;

  constructor(
    private fb: FormBuilder,
    private promocionService : PromocionService,
    private userService: UsuarioService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.url = environment.baseUrl;
    this.identity = this.userService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
    this.validacionesFormulario();

  }



   /**
   * @method: Permite obtener los datos del form y sus validaciones
   * @author: malcolm
   * @since: 22/08/2022
   */

  validacionesFormulario(){
    this.promocionForm = this.fb.group({
      producto_title: ['', Validators.required],
      description: ['', Validators.required],
      enlace: ['', Validators.required],
      subtitulo: ['', Validators.required],
      first_title: ['', Validators.required],
      target: [''],
      boton: ['', Validators.required],
      is_active: ['', Validators.required],
      is_activeText: ['', Validators.required],
      is_activeBot: ['', Validators.required],
      user_id: [this.identity.id, Validators.required],
    });
  }


  iniciarFormulario(id:number){debugger


    if (id !== null && id !== undefined) {
      this.pageTitle = 'Editar Promo';
      this.promocionService.getPromocionById(id).subscribe(
        res => {
          this.promocionForm.patchValue({
            id: res.id,
            user_id: this.identity.id,
            producto_title: res.producto_title,
            first_title: res.first_title,
            subtitulo: res.subtitulo,
            description: res.description,
            enlace: res.enlace,
            target: res.target,
            boton: res.boton,
            is_active: res.is_active,
            is_activeText: res.is_activeText,
            is_activeBot: res.is_activeBot,
          });
        }
      );
    } else {
      this.pageTitle = 'Crear Promo';
    }

  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect= reader.result;
        reader.readAsDataURL(this.file);

    }

  }

  onSubmit(promocionForm){debugger
    const {
      producto_title,
      user_id,
      description,
      enlace,
      subtitulo,
      first_title,
      target,
      boton,
      is_active,
      is_activeText,
      is_activeBot,
     } = this.promocionForm.value;

    if(this.promoSeleccionado){
      //actualizar
      const data = {
        ...this.promocionForm.value,
        user_id: this.identity.id,
        id: this.promoSeleccionado.id
      }

      this.promocionService.actualizarPromocion(data, this.promocion.id).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${producto_title} actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.promocionService.crearPromocion(this.promocionForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${producto_title} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/marca/`)
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
    .actualizarFoto(this.imagenSubir, 'promocions', this.promoSeleccionado.id)
    .then(img => { this.promoSeleccionado.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
