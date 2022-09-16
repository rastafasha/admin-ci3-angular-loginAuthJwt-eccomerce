import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSumitted = false;

  public registerForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: [ '', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    username: ['', Validators.required],
    role_id: [2],
    // terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'password2')

  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }




  ngOnInit(): void {
  }

  crearUsuario(){

    const {
      first_name,
      last_name,
      email,
      password,
      password2,
      username,
      role_id,
     } = this.registerForm.value;

    this.formSumitted = true;
    // console.log(this.registerForm.value);

    const formData = new FormData();
    formData.append('first_name', this.registerForm.get('first_name').value);
    formData.append('last_name', this.registerForm.get('last_name').value);
    formData.append('email', this.registerForm.get('email').value);
    formData.append('password', this.registerForm.get('password').value);
    formData.append('password2', this.registerForm.get('password2').value);
    formData.append('username', this.registerForm.get('username').value);
    formData.append('role_id', this.registerForm.get('role_id').value);

    if(this.registerForm.invalid){
      return;
    }

    //realizar el posteo del usuario
    this.usuarioService.crearUsuario(formData).subscribe(
      resp =>{
        console.log(resp);
        this.router.navigateByUrl('/login');
      },(err) => {
        console.log(err);
        // Swal.fire('Error', err.error.msg, 'error');
      }
    );

  }

  campoNoValido(campo: string): boolean {
    if(this.registerForm.get(campo).invalid && this.formSumitted){
      return true;
    }else{
      return false;
    }


  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSumitted;
  }

  passwordNoValido(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if((pass1 !== pass2) && this.formSumitted){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

}
