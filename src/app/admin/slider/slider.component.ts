import { Component,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { BusquedasService } from '../../services/busquedas.service';
import { Slider } from '../../models/slider.model';
import { SliderService } from '../../services/slider.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Router } from '@angular/router';

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
          console.log(this.sliders);

      this.cargando = false;

  }

  guardarCambios(id: number){

    id = this.slider.id;
    if(id){
      this.sliderService.actualizarSlider(this.slider.id, this.slider)
      .subscribe( resp => {
        Swal.fire('Actualizado', this.slider.title,  'success')
      })

    }

  }


  eliminarSlider(id: number){
    this.sliderService.borrarSlider(id)
    .subscribe( resp => {
      this.loadSliders();
      Swal.fire('Borrado', this.slider.title, 'success')
    })

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
