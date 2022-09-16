import { Component } from '@angular/core';

import { CongeneralService } from './services/congeneral.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Configuracion } from './models/configuracion.model';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';
  public congeneral : Configuracion;
  public congenerals : any = {};
  public url;
  public headers = false;


  constructor(
    private _congeneralService : CongeneralService,
    private http: HttpClient,
    private _router : Router
    ){
      this._congeneralService.cargarCongenerals().subscribe( response =>{
        this.congeneral = response; this.url = environment.baseUrl;
        $('#favicon_icon').attr('href',this.url+'api_configuracion/adminConfiguracion/'+this.congeneral.favicon);
        $('#title_general').text(this.congeneral.titulo);

        console.log(this.congeneral);
        console.log(this.congeneral.titulo);
      },
         error=>{ } );
        this._congeneralService.cargarCongenerals().subscribe( response =>{
          this.congeneral = response; this.url = environment.baseUrl;
          $('#favicon_icon').attr('href',this.url+'api_configuracion/adminConfiguracion/'+this.congeneral.favicon);
          $('#title_general').text(this.congeneral.titulo);
        }, error=>{ } );
  }

  ngOnInit(): void{

  }

  onActivate(event) {
      window.scroll(0,0);

  }
}
