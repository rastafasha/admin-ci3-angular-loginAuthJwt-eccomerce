import { Component, OnInit } from '@angular/core';
import { SelectorService } from "../../../services/selector.service";
import { ActivatedRoute, Router, ChildActivationStart } from '@angular/router';

import Swal from 'sweetalert2';
import { Location } from '@angular/common';

import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  public id;
  public selectores;
  public count_selec;
  public page;
  public pageSize = 12;
  public input_selector;
  public identity;

  constructor(
    private _selectorService : SelectorService,
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService: UsuarioService,
    private location: Location,
  ) {
    this.identity = this._userService.usuario;
  }

  ngOnInit(): void {


  }

  listar(){
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._selectorService.listar(this.id).subscribe(
          response=>{
            this.selectores = response.selectores;
            this.count_selec = this.selectores.length;
            this.page = 1;
            console.log(this.selectores);


          },
          error=>{

          }
        )
      }
    );
  }

  onSubmit(selectForm){
    if(selectForm.valid){
      this._selectorService.crearSelector({titulo: this.input_selector,producto:this.id}).subscribe(
        response =>{
          this.input_selector = '';
          this.listar();
        },
        error=>{

        }
      )

    }else{

    }
  }

  eliminar(id){
    this._selectorService.borrarSelector(id).subscribe(
      response=>{
        this.listar();
      },
      error =>{

      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
