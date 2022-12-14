import { Component, OnInit, DoCheck } from '@angular/core';
import {environment} from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Configuracion } from 'src/app/models/configuracion.model';
import { CongeneralService } from 'src/app/services/congeneral.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-config-site',
  templateUrl: './config-site.component.html',
  styleUrls: ['./config-site.component.css']
})
export class ConfigSiteComponent implements OnInit {



  public confGeneralForm: FormGroup;
  public configuracion: Configuracion;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public imagenSubir1: File;
  public imgTemp1: any = null;
  pageTitle: string;
  error: string;
  public congeneralSeleccionado: Configuracion;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private congeneralService: CongeneralService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.usuario = usuarioService.user;
    this.configuracion = congeneralService.configuracion;
    const base_url = environment.baseUrl;
  }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.obtenerIdCongeneral(id));
    this.validacionesFormulario();


  }

  obtenerIdCongeneral(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      this.pageTitle = 'Editar Configuracion';
      this.congeneralService.getCongeneralById(+id).subscribe(
        res => {
          this.confGeneralForm.patchValue({
            id: res.id,
            titulo: res.titulo,
            cr: res.cr,
            telefono_uno: res.telefono_uno,
            telefono_dos: res.telefono_dos,
            email_uno: res.email_uno,
            email_dos: res.email_dos,
            direccion: res.direccion,
            horarios: res.horarios,
            iframe_mapa: res.iframe_mapa,
            facebook: res.facebook,
            instagram: res.instagram,
            twitter: res.twitter,
            youtube: res.youtube,
            language: res.language,
            logoUrl: res.logoUrl,
            faviconUrl: res.faviconUrl,
            user_id: this.usuario.id,
            // logo: this.logo,
          });
          // this.imagenSubir = res.logo;

          this.configuracion = res;
          console.log(this.configuracion);
        }
      );
    } else {
      this.pageTitle = 'Crear Configuracion';
    }


  }



  validacionesFormulario(){
    this.confGeneralForm = this.fb.group({
      titulo: ['', Validators.required],
      cr: ['', Validators.required],
      telefono_uno: ['', Validators.required],
      telefono_dos: [''],
      email_uno: ['', Validators.required],
      email_dos: [''],
      direccion: [''],
      horarios: [''],
      iframe_mapa: [''],
      facebook: [''],
      instagram: [''],
      youtube: [''],
      twitter: [''],
      id: [''],
      logoUrl: [''],
      faviconUrl: [''],
      language: ['', Validators.required],
      user_id: [this.usuario.id, Validators.required],
    });
  }






  updateConfiguracion(){

    const {
      user_id,
      titulo, cr, telefono_uno,telefono_dos, email_uno,
      email_dos, direccion, horarios, iframe_mapa, facebook,
      instagram, youtube, twitter, language
    } = this.confGeneralForm.value;


    const formData = new FormData();
    formData.append('titulo', this.confGeneralForm.get('titulo').value);
    formData.append('cr', this.confGeneralForm.get('cr').value);
    formData.append('user_id', this.confGeneralForm.get('user_id').value);
    formData.append('telefono_uno', this.confGeneralForm.get('telefono_uno').value);
    formData.append('telefono_dos', this.confGeneralForm.get('telefono_dos').value);
    formData.append('email_uno', this.confGeneralForm.get('email_uno').value);
    formData.append('email_dos', this.confGeneralForm.get('email_dos').value);
    formData.append('direccion', this.confGeneralForm.get('direccion').value);
    formData.append('horarios', this.confGeneralForm.get('horarios').value);
    formData.append('iframe_mapa', this.confGeneralForm.get('iframe_mapa').value);
    formData.append('facebook', this.confGeneralForm.get('facebook').value);
    formData.append('instagram', this.confGeneralForm.get('instagram').value);
    formData.append('youtube', this.confGeneralForm.get('youtube').value);
    formData.append('twitter', this.confGeneralForm.get('twitter').value);
    formData.append('language', this.confGeneralForm.get('language').value);
    formData.append('logoUrl', this.confGeneralForm.get('logoUrl').value);
    formData.append('faviconUrl', this.confGeneralForm.get('faviconUrl').value);

    const id = this.confGeneralForm.get('id').value;


      this.congeneralService.actualizarCongeneral(formData, +id)
            .subscribe(resp => {

              this.configuracion.id = this.configuracion.id;
              this.configuracion.user_id = this.usuario.id;
              this.configuracion.titulo = titulo;
              this.configuracion.cr = cr;
              this.configuracion.telefono_uno = telefono_uno;
              this.configuracion.telefono_dos = telefono_dos;
              this.configuracion.email_uno = email_uno;
              this.configuracion.email_dos = email_dos;
              this.configuracion.direccion = direccion;
              this.configuracion.horarios = horarios;
              this.configuracion.iframe_mapa = iframe_mapa;
              this.configuracion.facebook = facebook;
              this.configuracion.instagram = instagram;
              this.configuracion.youtube = youtube;
              this.configuracion.twitter = twitter;
              this.configuracion.language = language;

              Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
            }, (err)=>{
              Swal.fire('Error', err.error.msg, 'error');

            })

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
    .actualizarFoto(this.imagenSubir, 'configuraciones', this.congeneralSeleccionado.id)
    .then(img => {
      this.congeneralSeleccionado.logo = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })

  }

  cambiarImagen1(file: File){
    this.imagenSubir1 = file;

    if(!file){
      return this.imgTemp1 = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp1 = reader.result;
    }
  }

  subirImagen1(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir1, 'configuraciones', this.congeneralSeleccionado.id)
    .then(img => {
      this.congeneralSeleccionado.favicon = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })

  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }




}
