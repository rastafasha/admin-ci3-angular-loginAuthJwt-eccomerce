import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { BusquedasService } from '../../../services/busquedas.service';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { Curso, VideoCurso } from '../../../models/curso.model';
import { CursoService } from '../../../services/curso.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { VideocursoService } from 'src/app/services/videocurso.service';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-curso-videoview',
  templateUrl: './curso-videoview.component.html',
  styleUrls: ['./curso-videoview.component.css']
})
export class CursoVideoviewComponent implements OnInit {

  public videocursos:VideoCurso;
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
    private videocursoService: VideocursoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService,
  ) { }

  ngOnInit(): void {
    this.loadVideos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => { this.loadVideos();});
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadVideos(){
    this.cargando = true;

    this.videocursoService.cargarVideocursos().subscribe(
      (res: VideoCurso) => this.videocursos = res,
      );
      console.log(this.videocursos);
      this.cargando = false;

  }

  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    }else if( this.desde > this.totalCursos){
      this.desde -= valor;
    }

    this.loadVideos();


  }




  eliminarCurso(id: number){
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.videocursoService.borrarVideocurso(+id).subscribe(
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




}
