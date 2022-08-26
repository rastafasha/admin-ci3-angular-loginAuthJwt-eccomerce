import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  roles;

  listRoles;

  usuarioSeleccionado: Usuario;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.user;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      first_name: [ this.usuario.first_name, Validators.required ],
      last_name: [ this.usuario.last_name, Validators.required ],
      email: [ this.usuario.email, Validators.required ],
      username: [ this.usuario.username ],
    });

    this.obtenerRoles();
    this.cargarRoles();
  }

  actualizarPerfil(){

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(resp => {
      const {first_name, last_name, username} = this.perfilForm.value;
      this.usuario.first_name = first_name;
      this.usuario.last_name = last_name;
      this.usuario.username = username;
      Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
    }, (err)=>{
      Swal.fire('Error', err.error.msg, 'error');

    })
  }

  obtenerRoles(){
    this.usuarioService.getRoles().subscribe(
      resp=>{
        resp
        console.log(resp);
      }
    )
  }

  cargar_iconos(){
    this.usuarioService.getRoles().subscribe(
      resp =>{
        this.listRoles = resp;
        console.log(this.listRoles)

      }
    )
  }

  cargarRoles(){
    this.usuarioService.getRoles().subscribe(
      resp =>{
        this.roles = resp;
        console.log(this.roles)

      }
    )
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
    // this.fileUploadService
    // .actualizarFoto(this.imagenSubir, 'users', this.usuario.id)
    // .then(img => { this.usuario.img = img;
    //   Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
    // }).catch(err =>{
    //   Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    // })
  }

}
