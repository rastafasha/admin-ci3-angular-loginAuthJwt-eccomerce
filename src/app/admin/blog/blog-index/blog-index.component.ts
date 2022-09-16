import { Component,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Blog} from '../../../models/blog.model'

import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-blog-index',
  templateUrl: './blog-index.component.html',
  styleUrls: ['./blog-index.component.css']
})
export class BlogIndexComponent implements OnInit {

  public blog: Blog;
  public blogs: Blog;
  public cargando: boolean = true;

  public desde: number = 0;

  p: number = 1;
  count: number = 8;

  error: string;
  msm_error: string;

  public imgSubs: Subscription;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadBlogs();

  }

  loadBlogs(){
    this.cargando = true;
    this.blogService.getBlogs().subscribe(
      (data: Blog) => this.blogs = data,
      );
      this.cargando = false;

  }

  guardarCambios(id: number){

    // if(id){
    //   this.blogService.updateBlog(this.blog.id)
    //   .subscribe( resp => {
    //     Swal.fire('Actualizado',  'success')
    //   })

    // }

  }


  eliminarBlog(id: number){

    this.blogService.deleteBlog(+id).subscribe(
      response =>{
        this.loadBlogs();
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

    // if(termino.length === 0){
    //   return this.loadPromocions();
    // }

    // this.busquedaService.buscar('promocions', termino)
    // .subscribe( resultados => {
    //   resultados;
    // })
  }

  editarId(id:number ) {
    this.blogService.getBlog(id).subscribe(
      res =>{
        this.router.navigateByUrl('/dashboard/blog/edit/'+id);

      }
    );
  }

}
