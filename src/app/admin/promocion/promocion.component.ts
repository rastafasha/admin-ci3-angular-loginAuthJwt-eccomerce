import { Component,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { BusquedasService } from '../../services/busquedas.service';
import { Promocion } from '../../models/promocion.model';
import { PromocionService } from '../../services/promocion.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit {

  public promocion: Promocion;
  public promocions: Promocion;
  public cargando: boolean = true;

  public desde: number = 0;

  p: number = 1;
  count: number = 8;
  error: string;
  public msm_error;

  public imgSubs: Subscription;
  public imgTemp: any = null;

  constructor(
    private promocionService: PromocionService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadPromocions();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => { this.loadPromocions();});
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadPromocions(){
    this.cargando = true;
    this.promocionService.cargarPromocions().subscribe(
      (data: Promocion) => this.promocions = data,
      );
          console.log(this.promocions);

      this.cargando = false;

  }

  guardarCambios(id: number){
    id = this.promocion.id;
    if(id){
      this.promocionService.actualizarPromocion(this.promocion, this.promocion.id)
      .subscribe( resp => {
        Swal.fire('Actualizado', this.promocion.producto_title,  'success')
      })

    }

  }


  eliminarPromocion(id: number){
    this.promocionService.borrarPromocion(+id).subscribe(
      response =>{
        this.loadPromocions();
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        $('.fix-header').removeClass('modal-open');
      },
      error=>{
        this.msm_error = 'No se pudo eliminar el curso, vuelva a intentar.'
      }
    );
    this.ngOnInit();

  }



  buscar(termino: string){

    if(termino.length === 0){
      return this.loadPromocions();
    }

    this.busquedaService.buscar('promocions', termino)
    .subscribe( resultados => {
      resultados;
    })
  }

  editarId(id:number ) {
    this.promocionService.getPromocionById(id).subscribe(
      res =>{
        this.router.navigateByUrl('/dashboard/promocion/edit/'+id);

      }
    );
  }

}
