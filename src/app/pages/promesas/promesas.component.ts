import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
//import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios( ).then(usuarios => {
      console.log(usuarios);
    })

    /*const promesa = new Promise( (resolve, reject)=>{

    if(false) {
      resolve('Hola mundo');

    }else {
      reject('Algo salio mal');

    }


  } );

  promesa.then( (mensaje) =>{
    console.log(mensaje)
  }).catch(error => console.log('error en mi promesa', error));
  console.log('fin init')
  }*/

}
getUsuarios(){
  return new Promise( resolve =>{

    fetch('https://reqres.in/api/users')
    .then( resp => resp.json())
    .then(body => resolve(body.data))

  });

}
/*getUsuarios(){
    fetch('https://reqres.in/api/users')
  .then( resp => {
    resp.json().then(body => console.log(body))
  })
}*/

}
