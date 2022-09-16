import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


import { Curso, VideoCurso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { VideocursoService } from 'src/app/services/videocurso.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-curso-videos',
  templateUrl: './curso-videos.component.html',
  styleUrls: ['./curso-videos.component.css']
})
export class CursoVideosComponent implements OnInit {


  @Input() curso: Curso;
  // @Input() id:Curso;

  public curso_id:number;


  public videocurso = new VideoCurso(0,0,0,'','',null,null);
  public msm_error = '';
  public videocursos:VideoCurso;


  constructor(
    private fb: FormBuilder,
    private videocursoService: VideocursoService,
    private activatedRoute: ActivatedRoute,
    private cursoService: CursoService,
    private location: Location
  ) {
    const base_url = environment.baseUrl;
    this.curso = cursoService.curso;
  }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.loadVideos();
    this.activatedRoute.params.subscribe( ({id}) => this.listarVideo(id));
    this.activatedRoute.params.subscribe( ({curso_id}) => this.getCursoId(curso_id));
    this.activatedRoute.params.subscribe( ({curso_id}) => this.listarVideobyCursoId(curso_id));

  }

  getCursoId(curso_id:number){
    if (curso_id !== null && curso_id !== undefined) {
      this.cursoService.getCursoById(+curso_id).subscribe(
        res => {
          this.curso = res;
          console.log(this.curso);
        }
        );
    }else{
      return;
    }
  }

  listarVideo(id:number){
    if (id !== null && id !== undefined) {
      this.videocursoService.getVideocursoById(+id).subscribe(
        res => {
          this.videocurso = res;
          console.log(this.videocurso);
        }
      );

    }else{
      return;
    }

  }

  listarVideobyCursoId(curso_id:number){
    if (curso_id !== null && curso_id !== undefined) {
      this.videocursoService.getVBC(+curso_id).subscribe(
        res => {
          this.videocursos = res;
          console.log(this.videocursos);
        }
      );

    }else{
      return;
    }

  }

  loadVideos(){
    // this.videocursoService.cargarVideocursos().subscribe(
    //   (res: VideoCurso) => this.videocursos = res,
    //   );
    //   console.log(this.videocursos);

  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  onSubmit(videoForm){debugger
    const {url, estado, curso_id} = videoForm.value;

    const formData = new FormData();
    formData.append('url', videoForm.value.url);
    formData.append('estado', videoForm.value.estado);
    // formData.append('curso_id', videoForm.value.curso_id);

    const id = videoForm.get('curso_id').value;

    if(id){
      // let data = {
      //   url : videoForm.value.url,
      //   estado : videoForm.value.estado,
      //   curso_id: this.curso.id,
      // }

      this.videocursoService.crearVideocurso(formData).subscribe(
        response =>{
          this.videocurso = new VideoCurso(0,0,0,'','',null,null);
          Swal.fire('Creado', `creado correctamente`, 'success');
          console.log(response);
          this.ngOnInit();
        },
        error=>{
          console.log(error);

        }
      );
    }else{
      this.msm_error = 'Complete correctamente el formulario';
    }
  }



  close_alert(){
    this.msm_error = '';
  }

  eliminar(id:number){
    this.videocursoService.borrarVideocurso(+id).subscribe(
      response =>{
        this.ngOnInit();
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        $('.fix-header').removeClass('modal-open');
      },
      error=>{

      }
    );
    this.ngOnInit();
  }



}
