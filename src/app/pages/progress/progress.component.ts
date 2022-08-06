import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
 styleUrls:['./progress.component.css']
})
export class ProgressComponent {


  progreso: number = 50;
  progreso1: number = 35;

  get getPorcentaje(){
    return `${this.progreso}%`;
  }

  get getPorcentaje1(){
    return `${this.progreso1}`;
  }

  cambioValorHijo(valor:number){
    //console.log('Hey!!', valor);
    this.progreso = valor;
    this.progreso1 = valor;
  }

}
