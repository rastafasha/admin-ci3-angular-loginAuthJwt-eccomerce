import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import {environment} from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Contacto } from 'src/app/models/contacto.model';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {


  public url;
  public identity;
  public mensajes : Array<any> = [];
  public page;
  public pageSize = 15;
  public count_cat;

  constructor(
    private _userService: UsuarioService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _contactoService :ContactoService
  ) {
    this.identity = this._userService.usuario;
    this.url = environment.baseUrl;
  }

  ngOnInit(): void {
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

  eliminarMensaje(contacto: Contacto){
    // this._contactoService.borrarMessage(contacto._id);

  }

}
