import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

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

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
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
    // this.usuarioService.get_users().subscribe(
    //   (resp:any)=>{
    //     this.usuarios = resp;
    //     console.log(this.usuarios);
    //   }
    // )

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


  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario).subscribe(
      resp =>{ console.log(resp);}
    )
  }


  abrirModal(usuario: Usuario){
    // this.modalImagenService.abrirModal('users', this.usuario.id, usuario.img);

  }

}
