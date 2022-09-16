import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

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
  // public promocion : any = {};
  public usuario: Usuario;

  public promocions: Promocion[] =[];
  public promocion: Promocion;

  public imagenSubir: File;
  public imgTemp: any = null;
  pageTitle: string;
  id:number;

  banner;

  public error: string;
  public uploadError: string;
  public imagePath: string;

  constructor(
    private fb: FormBuilder,
    private promocionService : PromocionService,
    private userService: UsuarioService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.usuario = this.userService.user;
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
    this.promocionForm = this.fb.group({
      id: [''],
      producto_title: ['', Validators.required],
      description: ['', Validators.required],
      enlace: ['', Validators.required],
      subtitulo: ['', Validators.required],
      first_title: ['', Validators.required],
      target: [''],
      imgUrl: [''],
      boton: ['', Validators.required],
      is_active: ['', Validators.required],
      is_activeText: ['', Validators.required],
      is_activeBot: ['', Validators.required],
      user_id: [this.usuario.id, Validators.required],
    });
  }


  iniciarFormulario(id:number){

    if (id !== null && id !== undefined) {
      this.pageTitle = 'Editar Promo';
      this.promocionService.getPromocionById(+id).subscribe(
        res => {
          this.promocionForm.patchValue({
            id: res.id,
            user_id: this.usuario.id,
            producto_title: res.producto_title,
            first_title: res.first_title,
            subtitulo: res.subtitulo,
            description: res.description,
            enlace: res.enlace,
            target: res.target,
            boton: res.boton,
            imgUrl: res.imgUrl,
            is_active: res.is_active,
            is_activeText: res.is_activeText,
            is_activeBot: res.is_activeBot,
            // img: res.img,
          });
          this.promocion = res;
        }
      );
    } else {
      this.pageTitle = 'Crear Promo';
    }
    this.validacionesFormulario();
  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect= reader.result;
        reader.readAsDataURL(this.file);

    }

  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.promocionForm.get('img').setValue(file);
    }
  }

  get producto_title() { return this.promocionForm.get('producto_title'); }
  get user_id() { return this.promocionForm.get('user_id'); }
  get description() { return this.promocionForm.get('description'); }
  get enlace() { return this.promocionForm.get('enlace'); }
  get subtitulo() { return this.promocionForm.get('subtitulo'); }
  get first_title() { return this.promocionForm.get('first_title'); }
  get target() { return this.promocionForm.get('target'); }
  get boton() { return this.promocionForm.get('boton'); }
  get is_active() { return this.promocionForm.get('is_active'); }
  get is_activeText() { return this.promocionForm.get('is_activeText'); }
  get is_activeBot() { return this.promocionForm.get('is_activeBot'); }

  updatePromoForm(promocionForm){
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

     const formData = new FormData();
    formData.append('producto_title', this.promocionForm.get('producto_title').value);
    formData.append('user_id', this.promocionForm.get('user_id').value);
    formData.append('description', this.promocionForm.get('description').value);
    formData.append('enlace', this.promocionForm.get('enlace').value);
    formData.append('subtitulo', this.promocionForm.get('subtitulo').value);
    formData.append('first_title', this.promocionForm.get('first_title').value);
    formData.append('target', this.promocionForm.get('target').value);
    formData.append('boton', this.promocionForm.get('boton').value);
    formData.append('is_active', this.promocionForm.get('is_active').value);
    formData.append('is_activeText', this.promocionForm.get('is_activeText').value);
    formData.append('is_activeBot', this.promocionForm.get('is_activeBot').value);
    formData.append('imgUrl', this.promocionForm.get('imgUrl').value);

     const id = this.promocionForm.get('id').value;

    if(id){
      //actualizar
      // const data = {
      //   ...this.promocionForm.value,
      //   user_id: this.identity.id,
      //   // id: this.promoSeleccionado.id
      // }

      this.promocionService.actualizarPromocion(formData, +id).subscribe(
        resp =>{
          this.promocion = resp;
          Swal.fire('Actualizado', `${producto_title} actualizado correctamente`, 'success');
        });

    }else{
      //crear
      this.promocionService.crearPromocion(formData)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${producto_title} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/promocion`)
        // this.router.navigateByUrl(`/dashboard/marca/${resp.marca.id}`)
      })
    }
    // console.log(this.promocionForm.value);
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
