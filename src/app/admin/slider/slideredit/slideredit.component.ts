import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from '../../../services/usuario.service';
import { SliderService } from 'src/app/services/slider.service';
import { Slider } from 'src/app/models/slider.model';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-slideredit',
  templateUrl: './slideredit.component.html',
  styleUrls: ['./slideredit.component.css']
})
export class SlidereditComponent implements OnInit {


  public file :File;
  public imgSelect : String | ArrayBuffer;
  public url;
  public identity;
  public msm_error = false;
  public msm_success = false;
  public slider : any = {};
  pageTitle: string;

  public sliderForm: FormGroup;
  public sliderSeleccionado: Slider;

  public sliders: Slider[] =[];

  public imagenSubir: File;
  public imgTemp: any = null;

  banner;

  constructor(
    private fb: FormBuilder,
    private sliderService : SliderService,
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


    if(this.sliderSeleccionado){
      //actualizar
      this.pageTitle = 'Edit Slider';

    }else{
      //crear
      this.pageTitle = 'Crear Slider';
    }
  }

   /**
   * @method: Permite obtener los datos del form y sus validaciones
   * @author: malcolm
   * @since: 22/08/2022
   */

    validacionesFormulario(){
      this.sliderForm = this.fb.group({
        title: ['', Validators.required],
        subtitulo: [''],
        enlace: [''],
        description: [''],
        target: [''],
        boton: [''],
        is_activeText: [''],
        is_activeBot: [''],
        is_active: [''],
        user_id: [this.identity.id, Validators.required]
      });
    }



  iniciarFormulario(id:number){debugger


    if (id !== null && id !== undefined) {
      this.pageTitle = 'Editar Slider!';
      this.sliderService.getSliderById(id).subscribe(
        res => {
          this.sliderForm.patchValue({
            id: res.id,
            user_id: this.identity.id,
            title: res.title,
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
      this.pageTitle = 'Crear Slider!';
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

  onSubmit(promocionForm){
    const {
      title,
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
     } = this.sliderForm.value;

    if(this.sliderSeleccionado){
      //actualizar

      const data = {
        ...this.sliderForm.value,
        user_id: this.identity.id,
        id: this.sliderSeleccionado.id
      }
      this.sliderService.actualizarSlider(data, this.slider.id).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${title} actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.sliderService.crearSlider(this.sliderForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${title} creado correctamente`, 'success');
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
    .actualizarFoto(this.imagenSubir, 'sliders', this.sliderSeleccionado.id)
    .then(img => { this.sliderSeleccionado.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
