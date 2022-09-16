import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Role, Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario;
  public usuariosTemp: Usuario[] = [];

  public desde: number = 0;
  public cargando: boolean = true;

  usuario: Usuario;

  public imgSubs: Subscription;

  listRoles;
  rol: Role;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService,
    private roleService: RoleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
    this.obtenerRoles();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => { this.loadUsuarios();});

  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadUsuarios(){
    this.cargando = true;

    this.usuarioService.get_users().subscribe(
      (data: Usuario) => this.usuarios = data,
      );
          console.log(this.usuarios);

      this.cargando = false;
  }

  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if( this.desde > this.totalUsuarios){
      this.desde -= valor;
    }

    this.loadUsuarios();


  }

  obtenerRoles(){
    this.roleService.cargarRoles().subscribe(
      resp =>{
        this.listRoles = resp;
        console.log(this.listRoles)

      }
    )
  }

  buscar(termino: string){

    // if(termino.length === 0){
    //   return this.usuarios = this.usuariosTemp;
    // }

    // this.busquedaService.buscar('users', termino)
    // .subscribe( (resultados: Usuario[]) => {
    //   this.usuarios = resultados;
    // })
  }

  eliminarUsuario(usuario: Usuario){

    if(this.usuario.id === this.usuarioService.user.id){
      return Swal.fire('Error', 'No se puede borrarse a si mismo', 'error');

    }

    Swal.fire({
      title: 'Borra usuario?',
      text: `Estar a punto de borrar a ${usuario.first_name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario(usuario).subscribe(
          resp => {
            this.loadUsuarios();
            Swal.fire(
              'Usuario Borrado',
              `El usuario ${usuario.first_name} ha sido borrado correctamente`,
              'success'
               );
          });
      }
    })
  }


  cambiarRole(usuario: Usuario, id){
    this.usuarioService.guardarUsuario(usuario, +id).subscribe(
      resp =>{ console.log(resp);}
    )
  }


  abrirModal(usuario: Usuario){
    // this.modalImagenService.abrirModal('users', this.usuario.id, usuario.img);

  }

  editarId(id:number ) {
    this.usuarioService.get_user(id).subscribe(
      res =>{
        this.router.navigateByUrl('/dashboard/perfil/edit/'+id);

      }
    );
  }

}
