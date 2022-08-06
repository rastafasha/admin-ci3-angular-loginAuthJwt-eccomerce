import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VentaService } from "src/app/services/venta.service";
import { ComentarioService } from "src/app/services/comentario.service";
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-admin-detalleventas',
  templateUrl: './admin-detalleventas.component.html',
  styleUrls: ['./admin-detalleventas.component.css']
})
export class AdminDetalleventasComponent implements OnInit {

  public identity;
  public id;
  public detalle : any = {};
  public venta : any = {};
  public url;

  constructor(
    private _userService: UsuarioService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private _ventaService: VentaService,
    private _comentarioService : ComentarioService,
    private _productoService : ProductoService,
  ) {
    this.identity = this._userService.usuario;
    this.url = environment.baseUrl;
  }

  ngOnInit(): void {
    this.url = environment.baseUrl;
        this._route.params.subscribe(
          params=>{
            this.id = params['id'];
          }
        );
        this._ventaService.detalle(this.id).subscribe(
          response =>{
            this.detalle = response.detalle;
            this.venta = response.venta;
            console.log(this.detalle);

          },
          error=>{
          }
        );

  }

}
