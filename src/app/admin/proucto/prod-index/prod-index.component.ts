import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { BusquedasService } from '../../../services/busquedas.service';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-prod-index',
  templateUrl: './prod-index.component.html',
  styleUrls: ['./prod-index.component.css'],
  providers:[
    CategoriaService
  ]
})
export class ProdIndexComponent implements OnInit {

  public productos: Producto;
  public categorias: Categoria;
  public cargando: boolean = true;

  public totalProductos: number = 0;
  public desde: number = 0;

  p: number = 1;
  count: number = 8;

  public imgSubs: Subscription;
  listCategorias;

  public msm_error;
  public error;


  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
  ) { }

  ngOnInit(): void {

    this.loadCategorias();
    this.loadProductos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => { this.loadProductos();});
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadProductos(){
    this.cargando = true;
    this.productoService.cargarProductos().subscribe(
      (data: Producto) => this.productos = data,
      );
      // console.log(this.productos);
      this.cargando = false;

  }
  loadCategorias(){
    this.categoriaService.cargarCategorias().subscribe(
      resp =>{
        this.listCategorias = resp;
        console.log(this.listCategorias)

      }
    )

  }

  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if( this.desde > this.totalProductos){
      this.desde -= valor;
    }

    this.loadCategorias();


  }




  eliminarProducto(id: number){
    this.productoService.borrarProducto(+id).subscribe(
      response =>{
        this.loadProductos();
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
      return this.loadCategorias();
    }

    this.busquedaService.buscar('productos', termino)
    .subscribe( resultados => {
      resultados;
    })
  }




  desactivar(id){
    // this.productoService.desactivar(id).subscribe(
    //   response=>{
    //     $('#desactivar-'+id).modal('hide');
    //     $('.modal-backdrop').removeClass('show');
    //     this.loadProductos();
    //   },
    //   error=>{
    //     this.msm_error = 'No se pudo desactivar el producto, vuelva a intenter.'
    //   }
    // )
  }

  activar(id){
    // this.productoService.activar(id).subscribe(
    //   response=>{

    //     $('#activar-'+id).modal('hide');
    //     $('.modal-backdrop').removeClass('show');
    //     this.loadProductos();
    //   },
    //   error=>{


    //     this.msm_error = 'No se pudo activar el producto, vuelva a intenter.'
    //   }
    // )
  }




}
