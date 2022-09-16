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
  // public slider : any = {};
  pageTitle: string;

  public sliderForm: FormGroup;
  public sliderSeleccionado: Slider;

  public sliders: Slider[] =[];
  public slider: Slider;

  public imagenSubir: File;
  public imgTemp: any = null;

  banner;

  public error: string;
  public uploadError: string;
  public imagePath: string;

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





  }

   /**
   * @method: Permite obtener los datos del form y sus validaciones
   * @author: malcolm
   * @since: 22/08/2022
   */

    validacionesFormulario(){
      this.sliderForm = this.fb.group({
        title: ['', Validators.required],
        id: [''],
        enlace: [''],
        description: [''],
        target: [''],
        boton: [''],
        is_activeText: [''],
        is_activeBot: [''],
        is_active: [''],
        imgUrl: [''],
        user_id: [this.identity.id, Validators.required]
      });
    }



  iniciarFormulario(id:number){


    if (id !== null && id !== undefined) {
      this.pageTitle = 'Editar Slider!';
      this.sliderService.getSliderById(id).subscribe(
        res => {
          this.sliderForm.patchValue({
            id: res.id,
            user_id: this.identity.id,
            title: res.title,
            description: res.description,
            enlace: res.enlace,
            target: res.target,
            boton: res.boton,
            is_active: res.is_active,
            is_activeText: res.is_activeText,
            is_activeBot: res.is_activeBot,
            imgUrl: res.imgUrl,
            img: res.img,
          });

          this.slider = res;
        }
      );
    } else {
      this.pageTitle = 'Crear Slider!';
    }
    this.validacionesFormulario();

  }

  // imgSelected(event: HtmlInputEvent){
  //   if(event.target.files  && event.target.files[0]){
  //       this.file = <File>event.target.files[0];

  //       const reader = new FileReader();
  //       reader.onload = e => this.imgSelect= reader.result;
  //       reader.readAsDataURL(this.file);

  //   }

  // }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.sliderForm.get('img').setValue(file);
    }
  }

  updateSlideForm(){
    const {
      title,
      user_id,
      description,
      enlace,
      target,
      boton,
      is_active,
      is_activeText,
      is_activeBot,
     } = this.sliderForm.value;

     const formData = new FormData();
    formData.append('title', this.sliderForm.get('title').value);
    formData.append('user_id', this.sliderForm.get('user_id').value);
    formData.append('description', this.sliderForm.get('description').value);
    formData.append('enlace', this.sliderForm.get('enlace').value);
    formData.append('target', this.sliderForm.get('target').value);
    formData.append('boton', this.sliderForm.get('boton').value);
    formData.append('is_active', this.sliderForm.get('is_active').value);
    formData.append('is_activeText', this.sliderForm.get('is_activeText').value);
    formData.append('is_activeBot', this.sliderForm.get('is_activeBot').value);
    formData.append('imgUrl', this.sliderForm.get('imgUrl').value);
    // formData.append('img', this.sliderForm.get('img').value);

     const id = this.sliderForm.get('id').value;

    if(id){
      //actualizar

      // const data = {
      //   ...this.sliderForm.value,
      //   user_id: this.identity.id,
      //   // id: this.sliderSeleccionado.id
      // }
      this.sliderService.actualizarSlider(formData, +id).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${title} actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.sliderService.crearSlider(formData)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${title} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/slider`)
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
    .actualizarFoto(this.imagenSubir, 'sliders', this.slider.id)
    .then(img => { this.slider.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
