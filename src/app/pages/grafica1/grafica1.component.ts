import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  @Input() Pagetitle: string = 'Grafico';

  labels1: string[] = ['Pan', 'Refresco', 'Embutidos'];

  public data1 = [
    [350, 450, 100],
  ];

   constructor() { }

   ngOnInit(): void {
   }

}
