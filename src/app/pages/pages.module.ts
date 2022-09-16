import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//modules
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';


import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
// import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
// import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
// import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { IconosService } from '../services/iconos.service';
import { UsuarioService } from '../services/usuario.service';
import { CategoriaService } from '../services/categoria.service';
import { ProductoService } from '../services/producto.service';
import { CursoService } from '../services/curso.service';
import { GalleryService } from '../services/galeria.service';
import { VideocursoService } from '../services/videocurso.service';



@NgModule({
  declarations: [
    DashboardComponent,
    // ProgressComponent,
    // Grafica1Component,
    // RxjsComponent,
    // PromesasComponent,
    PagesComponent,
    AccountSettingComponent,
    PerfilComponent,
    UsuariosComponent,
    BusquedaComponent,
    // HospitalesComponent,
    // MedicosComponent,
    // MedicoComponent,
  ],
  exports: [
    DashboardComponent,
    // ProgressComponent,
    // Grafica1Component,
    // PromesasComponent,
    // RxjsComponent,
    PagesComponent,
    AccountSettingComponent,
    PerfilComponent,
    UsuariosComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule


  ],
  providers:[
    IconosService,
    UsuarioService,
    CategoriaService,
    ProductoService,
    CursoService,
    GalleryService,
    VideocursoService
  ]
})
export class PagesModule { }
