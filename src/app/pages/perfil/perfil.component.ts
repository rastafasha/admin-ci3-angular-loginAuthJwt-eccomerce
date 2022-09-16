import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role, Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RoleService } from 'src/app/services/role.service';
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

  pageTitle: string;
  pageSubTitle: string;

  usuarioSeleccionado: Usuario;

  listRoles;
  rol: Role;
  id: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private roleService: RoleService,
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.usuario = usuarioService.user;
  }

  ngOnInit(): void {

    this.obtenerRoles();
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));

  }

  obtenerRoles(){
    this.roleService.cargarRoles().subscribe(
      resp =>{
        this.listRoles = resp;
        console.log(this.listRoles)

      }
    )
  }


  iniciarFormulario(id:number){debugger
    if (id !== null && id !== undefined) {
      this.pageSubTitle = 'Editing';
      this.usuarioService.get_user(+id).subscribe(
        res => {
          this.perfilForm.patchValue({
            id: res.id,
            first_name: res.first_name,
            last_name: res.last_name,
            email: res.email,
            role_id: res.role_id,
            username: res.username,
            google: res.google,
            img: res.img,
          });
          this.usuario = res;
        }
      );
    } else {
      this.pageSubTitle = 'Creating';
    }
    this.validacionesFormulario();
  }


  validacionesFormulario(){
    this.perfilForm = this.fb.group({
      id: [ this.usuario.id ],
      first_name: [ this.usuario.first_name, Validators.required ],
      last_name: [ this.usuario.last_name, Validators.required ],
      email: [ this.usuario.email ],
      role_id: [ this.usuario.role_id ],
      username: [ this.usuario.username ],
      google: [ ''],
      img: [ ''],
    });
  }

  actualizarPerfil(){debugger

    const {
      first_name,
      last_name,
      username,
      role_id,
     } = this.perfilForm.value;


    const formData = new FormData();
    formData.append('first_name', this.perfilForm.get('first_name').value);
    formData.append('last_name', this.perfilForm.get('last_name').value);
    formData.append('username', this.perfilForm.get('username').value);
    formData.append('role_id', this.perfilForm.get('role_id').value);
    formData.append('id', this.perfilForm.value.id);
    // formData.append('img', this.perfilForm.get('img').value);

    const id = this.perfilForm.get('id').value;

    if(id){

      // const data = {
      //   ...this.perfilForm.value,
      // }
      this.usuarioService.actualizarPerfil(formData, +id)
    .subscribe(resp => {

      this.usuario = resp;
      Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
    }, (err)=>{
      Swal.fire('Error', err.error.msg, 'error');

    })
    }else{
      this.usuarioService.crearUsuario(formData)
      .subscribe( (resp:any) =>{
        Swal.fire('Creado', `creado correctamente`, 'success');
        // this.router.navigateByUrl(`/dashboard/curso`)
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
    .actualizarFoto(this.imagenSubir, 'users', this.usuario.id)
    .then(img => { this.usuario.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }

}
