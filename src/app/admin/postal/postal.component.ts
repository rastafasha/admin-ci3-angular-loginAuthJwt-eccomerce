import { Component, OnInit } from '@angular/core';
import { Envio } from "src/app/models/postal.model";
import { PostalService } from "src/app/services/postal.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';
declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-postal',
  templateUrl: './postal.component.html',
  styleUrls: ['./postal.component.css']
})
export class PostalComponent implements OnInit {

  public postal = new Envio(0,'','',0,null);
  public msm_error = '';
  public postales:Envio;
  public identity;

  postalForm;

  constructor(
    private postalService : PostalService,
    private usuarioService: UsuarioService,
    private router : Router,
    private route :ActivatedRoute,
  ) {
    this.identity = this.usuarioService.user;
  }

  ngOnInit(): void {
    this.listar();
  }


  onSubmit(postalForm){

    const {
      titulo,
      tiempo,
      precio,
      dias,
    } = postalForm.value;

    const formData = new FormData();
    formData.append('titulo', postalForm.value.titulo);
    formData.append('tiempo', postalForm.value.tiempo);
    formData.append('precio', postalForm.value.precio);
    formData.append('dias', postalForm.value.dias);

    if(postalForm.valid){
      // let data = {
      //   titulo : postalForm.value.titulo,
      //   tiempo : postalForm.value.tiempo,
      //   precio : postalForm.value.precio,
      //   dias : postalForm.value.dias,
      // }

      this.postalService.crearEnvio(formData).subscribe(
        resp =>{
          this.postal = resp;
          // console.log(this.postal);
          this.listar();
        },
        error=>{
          console.log(error);

        }
      );
    }else{
      this.msm_error = 'Complete correctamente el formulario';
    }
  }

  listar(){

    this.postalService.listar().subscribe(
      (res: Envio) => this.postales = res,
      );
      console.log(this.postales);
  }

  close_alert(){
    this.msm_error = '';
  }

  eliminar(id:number){
    this.postalService.eliminar(+id).subscribe(
      response =>{
        this.listar();
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

}
