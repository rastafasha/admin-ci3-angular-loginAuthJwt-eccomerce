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


  public file :File;
  public imgSelect : String | ArrayBuffer;
  public url;
  public identity;
  public msm_error = false;
  public msm_success = false;
  public promocion : any = {};

  public promocionForm: FormGroup;
  public promoSeleccionado: Promocion;

  public promocions: Promocion[] =[];

  public imagenSubir: File;
  public imgTemp: any = null;
  pageTitle: string;

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
    this.identity = this.userService.usuario;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.loadPromocion(id));

    this.promocionForm = this.fb.group({
      producto_title: ['', Validators.required],
      first_title: ['', Validators.required],
      etiqueta: ['', Validators.required],
      subtitulo: ['', Validators.required],
      end: ['', Validators.required],
      enlace: ['', Validators.required],
      estado: ['', Validators.required]
    });

    if(this.promoSeleccionado.id){
      //actualizar
      this.pageTitle = 'Edit Promocion';

    }else{
      //crear
      this.pageTitle = 'Create Promocion';
    }
  }

  loadPromocion(_id: number){

    if(this.promocion.id === 'nuevo'){
      return;
    }

    this.promocionService.getPromocionById(this.promocion.id)
    .pipe(
      // delay(100)
      )
      .subscribe( promocion =>{


      if(!promocion){
        return this.router.navigateByUrl(`/dasboard/promocion`);
      }

        const { producto_title, first_title, subtitulo, enlace,  } = promocion;
        this.promoSeleccionado = promocion;
        this.promocionForm.setValue({producto_title, first_title, subtitulo, enlace, });

      });

  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect= reader.result;
        reader.readAsDataURL(this.file);

    }

  }

  onSubmit(promocionForm){
    const {
      producto_title,
      first_title,
      etiqueta,
      subtitulo,
      end,
      enlace,
      estado
     } = this.promocionForm.value;

    if(this.promoSeleccionado){
      //actualizar
      const data = {
        ...this.promocionForm.value,
        _id: this.promoSeleccionado.id
      }
      this.promocionService.actualizarPromocion(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${producto_title} actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.promocionService.crearPromocion(this.promocionForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${producto_title} creado correctamente`, 'success');
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
