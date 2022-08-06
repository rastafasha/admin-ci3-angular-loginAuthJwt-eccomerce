import { Component, OnInit } from '@angular/core';
import { ColorService } from "../../../services/color.service";
import { ActivatedRoute, Router, ChildActivationStart } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { Color } from 'src/app/models/color.model';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  public color;
  public usuario: Usuario;
  public colorForm: FormGroup;
  public colorSeleccionado: Color;

  public id;
  public colores;
  public count_color;
  public page;
  public pageSize = 12;
  public titulo;
  public msm_error;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private _colorService : ColorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.baseUrl;
   }

  ngOnInit(): void {
    window.scrollTo(0,0);

    this.listar();
        $('#color-picker').spectrum({
          type: "text",
          togglePaletteOnly: "true",
          change: function(color) {
            $('#color-data').val(color.toHexString());

          }
        });

    this.colorForm = this.fb.group({
      titulo: ['', Validators.required],
      producto: ['', Validators.required],
      color: ['', Validators.required],
    })


  }



  listar(){
    this.activatedRoute.params.subscribe(
      params=>{
        this.id = params['id'];
        this._colorService.listar(this.id).subscribe(
          response=>{
            this.colores = response.colores;
            this.count_color = this.colores.length;
            this.page = 1;
            console.log(this.colores);


          },
          error=>{

          }
        )
      }
    );
  }


  onSubmit(colorForm){


    if(colorForm.valid){
      this._colorService.crearColor({titulo: this.titulo,producto:this.id,color:$('#color-data').val()}).subscribe(
        response =>{
          this.color;
          this.titulo = '';
          this.listar();
          this.msm_error = '';
        },
        error=>{
          this.msm_error = 'Complete correctamente el formulario por favor.'
        }
      )

    }else{
      this.msm_error = 'Complete correctamente el formulario por favor.'
    }
  }


  eliminarColor(color: Color){
    this._colorService.borrarColor(color._id)
    .subscribe( resp => {
      Swal.fire('Borrado', color.titulo, 'success')
    })

  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
