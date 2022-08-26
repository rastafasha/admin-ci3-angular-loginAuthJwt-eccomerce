import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { BusquedasService } from '../../../services/busquedas.service';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { IconosService } from 'src/app/services/iconos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-index',
  templateUrl: './cat-index.component.html',
  styleUrls: ['./cat-index.component.css']
})
export class CatIndexComponent implements OnInit {

  @Output() categoria: Categoria;
  public cargando: boolean = true;

  categoryList: Categoria[] = []; //output

  public totalCategorias: number = 0;
  public desde: number = 0;

  p: number = 1;
  count: number = 8;

  categorias: Categoria;
  category: Categoria;

  public imgSubs: Subscription;
  listIcons;

  constructor(
    private categoriaService: CategoriaService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
    private _iconoService: IconosService,
    private router: Router
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
      (data: Categoria) => this.categorias = data,
      );
      console.log(this.categorias);
      this.cargando = false;
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

  guardarCambios(id: number){
    id = this.categoria.id;
    if(id){
      this.categoriaService.actualizarCategoria(this.categoria.id, this.categoria)
      .subscribe( resp => {
        Swal.fire('Actualizado', this.categoria.category_name,  'success')
      })

    }

  }


  eliminarCategoria(id: number){debugger
    id = this.categoria.id;
    if(id){
      this.categoriaService.borrarCategoria(id)
      .subscribe( resp => {
        this.loadCategorias();
        Swal.fire('Borrado', this.categoria.category_name, 'success')
      })

    }

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

  goToCreate(){
    this.router.navigateByUrl('/dashboard/categoria/create')
  }

  editarId(id:number ) {
    this.categoriaService.getCategoriaById(id).subscribe(
      res =>{
        this.router.navigateByUrl('/dashboard/categoria/edit/'+id);

      }
    );
  }

}
