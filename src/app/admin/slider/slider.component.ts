import { Component,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { BusquedasService } from '../../services/busquedas.service';
import { Slider } from '../../models/slider.model';
import { SliderService } from '../../services/slider.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public sliders: Slider;
  public cargando: boolean = true;

  public desde: number = 0;
  slider: Slider;

  p: number = 1;
  count: number = 8;

  public imgSubs: Subscription;

  public msm_error;

  constructor(
    private sliderService: SliderService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadSliders();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => { this.loadSliders();});
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadSliders(){
    this.cargando = true;
    this.sliderService.cargarSliders().subscribe(
      (data: Slider) => this.sliders = data,
      );
      this.cargando = false;

  }

  guardarCambios(id: number){

    id = this.slider.id;
    if(id){
      this.sliderService.actualizarSlider(this.slider, this.slider.id )
      .subscribe( resp => {
        Swal.fire('Actualizado', this.slider.title,  'success')
      })

    }

  }


  eliminarSlider(id: number){
    this.sliderService.borrarSlider(+id).subscribe(
      response =>{
        this.loadSliders();
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
      return this.loadSliders();
    }

    this.busquedaService.buscar('sliders', termino)
    .subscribe( resultados => {
      resultados;
    })
  }

  editarId(id:number ) {
    this.sliderService.getSliderById(id).subscribe(
      res =>{
        this.router.navigateByUrl('/dashboard/slider/edit/'+id);

      }
    );
  }

}
