import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { BusquedasService } from '../../../services/busquedas.service';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { IconosService } from 'src/app/services/iconos.service';

@Component({
  selector: 'app-cat-index',
  templateUrl: './cat-index.component.html',
  styleUrls: ['./cat-index.component.css']
})
export class CatIndexComponent implements OnInit {

  public categorias: Categoria[] =[];
  public cargando: boolean = true;

  public totalCategorias: number = 0;
  public desde: number = 0;

  p: number = 1;
  count: number = 8;

  public imgSubs: Subscription;
  listIcons;

  constructor(
    private categoriaService: CategoriaService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
    private _iconoService: IconosService,
  ) { }

  ngOnInit(): void {
    this.cargar_iconos();

    this.loadCategorias();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(banner => { this.loadCategorias();});
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadCategorias(){
    this.cargando = true;
    this.categoriaService.cargarCategorias().subscribe(
      categorias => {
        this.cargando = false;
        this.categorias = categorias;
        console.log(this.categorias);
      }
    )

  }

  cargar_iconos(){
    this._iconoService.getIcons().subscribe(
      resp =>{
        this.listIcons = resp;
        console.log(this.listIcons.iconos)

      }
    )
  }
  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if( this.desde > this.totalCategorias){
      this.desde -= valor;
    }

    this.loadCategorias();


  }

  guardarCambios(categoria: Categoria){
    this.categoriaService.actualizarCategoria(categoria)
    .subscribe( resp => {
      Swal.fire('Actualizado', categoria.category_name,  'success')
    })

  }


  eliminarCategoria(categoria: Categoria){
    this.categoriaService.borrarCategoria(categoria.id)
    .subscribe( resp => {
      this.loadCategorias();
      Swal.fire('Borrado', categoria.category_name, 'success')
    })

  }



  buscar(termino: string){

    if(termino.length === 0){
      return this.loadCategorias();
    }

    this.busquedaService.buscar('categories', termino)
    .subscribe( resultados => {
      resultados;
    })
  }

}
