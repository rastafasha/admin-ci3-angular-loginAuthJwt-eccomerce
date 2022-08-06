import { Component } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';// el interval repite las funciones
import {retry,map,filter, take} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent  {

  public intervalSubs: Subscription;

  constructor() {



    this.retornaObservable().pipe(
      retry(1)// reintenta hasta lograr, salta el error, el numero es las veces que reintenta probar
    ).subscribe(
      valor => console.log('Subs', valor),
      (error) => console.warn('Error:', error),
      () => console.info('terminado')
    );

    this.intervalSubs = this.retornarIntervalo().subscribe(console.log)//se comunica con el unsubscribe

    /*this.retornarIntervalo()
    .subscribe(console.log)//envia todos los argumentos*/


  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe(); //funciona al salir del componente

  }

  retornarIntervalo():Observable<number>{
    const intervalo = interval(1000)
    .pipe(
      map(valor => valor + 1), // operador que va en cadena, recibe el valor de cero y le suma 1, tambien lo transforma/ extrae solo lo que interesa de una api
      filter(valor => (valor % 2 === 0 )? true: false),//filtra solo los numeros pares
      take(10),


      );
    return intervalo;
  }

  retornaObservable():Observable<number>{
    let i = -1;

    const obs$ = new Observable<number>( observer =>{//se usa el simbolo $ para hacer referencia a un observable que quiero almacenar


      const intervalo = setInterval( () => {

        i++;
        observer.next(i); //emite el siguiente valor y se ejecuta siempre asi este en otra pagina

        //finalizar el observer
        if( i === 4){
          clearInterval(intervalo);
          observer.complete();

        }
        if(i === 2){
          observer.error('i llego al valor de 2')// mostrar errores
        }

      }, 1000)//tiempo de ejecucion

    });
    return obs$;
  }



}
