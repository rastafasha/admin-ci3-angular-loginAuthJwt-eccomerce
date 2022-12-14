import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { Marca } from '../../../models/marca.model';
import { MarcaService } from '../../../services/marca.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-marca-index',
  templateUrl: './marca-index.component.html',
  styleUrls: ['./marca-index.component.css']
})
export class MarcaIndexComponent implements OnInit {
  public marcas: Marca;
  public cargando: boolean = true;

  public totalMarcas: number = 0;
  public desde: number = 0;

  p: number = 1;
  count: number = 8;
  error: string;

  public imgSubs: Subscription;

  constructor(
    private marcaService: MarcaService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
  ) { }

  ngOnInit(): void {

    this.loadMarcas();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(banner => { this.loadMarcas();});
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadMarcas(){
    this.cargando = true;
    this.marcaService.cargarMarcas().subscribe(
      (data: Marca) => this.marcas = data,
      );
          console.log(this.marcas);

      this.cargando = false;
    // this.marcaService.cargarMarcas().subscribe(
    //   marcas => {
    //     this.cargando = false;
    //     this.marcas = marcas;
    //   }
    // )

  }


  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if( this.desde > this.totalMarcas){
      this.desde -= valor;
    }

    this.loadMarcas();


  }

  guardarCambios(marca: Marca, id: number){
    this.marcaService.actualizarMarca(marca, id)
    .subscribe( resp => {
      Swal.fire('Actualizado', marca.marca_name,  'success')
    })

  }


  eliminarMarca(id: number){
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.marcaService.borrarMarca(+id).subscribe(
        res => {
          console.log(res);
          Swal.fire('Borrado', 'success')
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
    this.ngOnInit();

  }



  buscar(termino: string){

    if(termino.length === 0){
      return this.loadMarcas();
    }

    this.busquedaService.buscar('marcas', termino)
    .subscribe( resultados => {
      resultados;
    })
  }

}
