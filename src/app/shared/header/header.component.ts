import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { ContactoService } from 'src/app/services/contact.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TranslateService } from '@ngx-translate/core';
import { Configuracion } from 'src/app/models/configuracion.model';
import { CongeneralService } from 'src/app/services/congeneral.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  public congenerals: Configuracion[];
  public mensajes : Array<any> = [];
  public page;
  public pageSize = 15;
  public count_cat;

  public activeLang = 'es';
  flag = false;
  is_visible: boolean;
  img:string;

  constructor(
    private usuarioService: UsuarioService,
    private congeralService: CongeneralService,
    private router: Router,
    private _contactoService :ContactoService,
    private translate: TranslateService
  ) {
    this.usuario = usuarioService.user;
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit(): void {
    this.flag = true;

    this.cargarConfiguraciones();

  }

  public cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
    this.flag = !this.flag;
    this.is_visible = !this.is_visible;
  }

  logout(){
    this.usuarioService.logout();
  }


  buscar(termino: string){

    if(termino.length === 0){
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);

  }

  cargarMensajes(){
    this._contactoService.listar().subscribe(
      response=>{
        this.mensajes = response.data;
        this.count_cat = this.mensajes.length;
        this.page = 1;
      },
      error=>{

      }
    );
  }

  cargarConfiguraciones(){
    this.congeralService.cargarCongenerals().subscribe(
      response=>{
        this.congenerals = response;
        // console.log('header', this.congenerals);
      },
      error=>{

      }
    );
  }

}
