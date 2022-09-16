import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Gallery } from 'src/app/models/galeria.model';
import { GalleryService } from 'src/app/services/galeria.service';
import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-gallery-index',
  templateUrl: './gallery-index.component.html',
  styleUrls: ['./gallery-index.component.css']
})
export class GalleryIndexComponent implements OnInit {

  public gallery: Gallery;
  public gallerys: Gallery;
  public cargando: boolean = true;

  public desde: number = 0;

  p: number = 1;
  count: number = 8;

  error: string;
  public msm_error;

  public imgSubs: Subscription;

  constructor(
    private galleryService: GalleryService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadGallerys();

  }

  loadGallerys(){
    this.cargando = true;
    this.galleryService.getGallerys().subscribe(
      (data: Gallery) => this.gallerys = data,
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


  eliminarPhotoGallery(id: number){

    this.galleryService.eliminarPhotoGallery(+id).subscribe(
      response =>{
        this.loadGallerys();
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
    this.galleryService.getGalleryById(id).subscribe(
      res =>{
        this.router.navigateByUrl('/dashboard/gallery/edit/'+id);

      }
    );
  }

}
