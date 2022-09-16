import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { Configuracion } from '../../../models/configuracion.model';
import { MarcaService } from '../../../services/marca.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { CongeneralService } from 'src/app/services/congeneral.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public confgs: Configuracion[] =[];
  public cargando: boolean = true;

  public totalMarcas: number = 0;
  public desde: number = 0;

  p: number = 1;
  count: number = 8;

  public imgSubs: Subscription;

  constructor(
    private congeneralService: CongeneralService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
  ) { }

  ngOnInit(): void {

    this.loadConfiguraciones();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(banner => { this.loadConfiguraciones();});
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadConfiguraciones(){
    this.cargando = true;
    this.congeneralService.cargarCongenerals().subscribe(
      confgs => {
        this.cargando = false;
        // this.confgs = confgs;
        console.log(this.confgs);
      }
    )

  }
  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if( this.desde > this.totalMarcas){
      this.desde -= valor;
    }

    this.loadConfiguraciones();


  }

  guardarCambios(confg: Configuracion){
    // this.congeneralService.actualizarCongeneral(confg)
    // .subscribe( resp => {
    //   Swal.fire('Actualizado', confg.titulo,  'success')
    // })

  }


  eliminarMarca(confg: Configuracion){
    this.congeneralService.borrarCongeneral(confg.id)
    .subscribe( resp => {
      this.loadConfiguraciones();
      Swal.fire('Borrado', confg.titulo, 'success')
    })

  }



}
