import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { BusquedasService } from '../../../services/busquedas.service';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { Curso } from '../../../models/curso.model';
import { CursoService } from '../../../services/curso.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-curso-index',
  templateUrl: './curso-index.component.html',
  styleUrls: ['./curso-index.component.css']
})
export class CursoIndexComponent implements OnInit {

  public cursos: Curso;
  public categorias: Categoria;
  public cargando: boolean = true;

  public totalCursos: number = 0;
  public desde: number = 0;

  p: number = 1;
  count: number = 8;
  error: string;

  public imgSubs: Subscription;
  listIcons;

  public msm_error;

  constructor(
    private cursoService: CursoService,
    private categoriaService: CategoriaService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
  ) { }

  ngOnInit(): void {

    this.loadCursos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => { this.loadCursos();});
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadCursos(){
    this.cargando = true;

    this.cursoService.cargarCursos().subscribe(
      (res: Curso) => this.cursos = res,
      );
      // console.log(this.cursos);
      this.cargando = false;


  }

  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if( this.desde > this.totalCursos){
      this.desde -= valor;
    }

    this.loadCursos();


  }




  eliminarCurso(id: number){
    this.cursoService.borrarCurso(+id).subscribe(
      response =>{
        this.loadCursos();
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        $('.fix-header').removeClass('modal-open');
      },
      error=>{
        this.msm_error = 'No se pudo eliminar el curso, vuelva a intentar.'
      }
    );

  }

  buscar(termino: string){

    if(termino.length === 0){
      return this.loadCursos();
    }

    this.busquedaService.buscar('cursos', termino)
    .subscribe( resultados => {
      resultados;
    })
    this.ngOnInit();
  }




  desactivar(id){
    this.cursoService.desactivar(id).subscribe(
      response=>{
        $('#desactivar-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.loadCursos();
      },
      error=>{
        this.msm_error = 'No se pudo desactivar el curso, vuelva a intenter.'
      }
    )
  }

  activar(id){
    this.cursoService.activar(id).subscribe(
      response=>{

        $('#activar-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.loadCursos();
      },
      error=>{


        this.msm_error = 'No se pudo activar el curso, vuelva a intenter.'
      }
    )
  }




}
