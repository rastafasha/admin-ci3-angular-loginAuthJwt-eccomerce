import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { CatIndexComponent } from '../admin/categoria/cat-index/cat-index.component';
import { CatEditComponent } from '../admin/categoria/cat-edit/cat-edit.component';
import { ProdIndexComponent } from '../admin/proucto/prod-index/prod-index.component';
import { ProdEditComponent } from '../admin/proucto/prod-edit/prod-edit.component';
import { ConfigSiteComponent } from '../admin/config-site/config-site.component';
import { PromocionComponent } from '../admin/promocion/promocion.component';
import { PostalComponent } from '../admin/postal/postal.component';
import { ContactoComponent } from '../admin/contacto/contacto.component';
import { PromoeditComponent } from '../admin/promocion/promoedit/promoedit.component';
import { CursoEditComponent } from '../admin/curso/curso-edit/curso-edit.component';
import { CursoIndexComponent } from '../admin/curso/curso-index/curso-index.component';
import { SliderComponent } from '../admin/slider/slider.component';
import { SlidereditComponent } from '../admin/slider/slideredit/slideredit.component';
import { ViewComponent } from '../admin/config-site/view/view.component';
// import { ColorComponent } from '../admin/proucto/color/color.component';
// import { SelectorComponent } from '../admin/proucto/selector/selector.component';
// import { CuponComponent } from '../admin/cupon/cupon.component';
// import { PapeleraComponent } from '../admin/proucto/papelera/papelera.component';
// import { AdminVentasComponent } from '../admin/ventas/admin-ventas/admin-ventas.component';
// import { DetalleCancelacionComponent } from '../admin/cancelacion/detalle-cancelacion/detalle-cancelacion.component';
// import { IndexCancelacionComponent } from '../admin/cancelacion/index-cancelacion/index-cancelacion.component';
// import { AdminChatComponent } from '../admin/ticket/admin-chat/admin-chat.component';
// import { AdminTicketComponent } from '../admin/ticket/admin-ticket/admin-ticket.component';
// import { AdminDetalleventasComponent } from '../admin/ventas/admin-detalleventas/admin-detalleventas.component';
// import { InvoiceComponent } from '../admin/ventas/invoice/invoice.component';
import { BlogIndexComponent } from '../admin/blog/blog-index/blog-index.component';
import { BlogEditComponent } from '../admin/blog/blog-edit/blog-edit.component';
import { MarcaIndexComponent } from '../admin/marca/marca-index/marca-index.component';
import { MarcaEditComponent } from '../admin/marca/marca-edit/marca-edit.component';
import { GalleryIndexComponent } from '../admin/gallery/gallery-index/gallery-index.component';
import { GalleryEditComponent } from '../admin/gallery/gallery-edit/gallery-edit.component';
import { CursoVideosComponent } from '../admin/curso/curso-videos/curso-videos.component';
import { CursoVideoviewComponent } from '../admin/curso/curso-videoview/curso-videoview.component';
import { PageIndexComponent } from '../admin/page/page-index/page-index.component';
import { PageEditComponent } from '../admin/page/page-edit/page-edit.component';



const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data:{tituloPage:'Dashboard'} },
            { path: 'account-settings', component: AccountSettingComponent, data:{tituloPage:'Ajustes de Cuenta'} },
            { path: 'buscar/:termino', component: BusquedaComponent, data:{tituloPage:'Busquedas'} },
            // { path: 'grafica1', component: Grafica1Component, data:{tituloPage:'Grafica 1'} },
            { path: 'perfil', component: PerfilComponent, data:{tituloPage:'Perfil'} },
            { path: 'perfil/edit/:id', component: PerfilComponent, data:{tituloPage:'Perfil'} },
            // { path: 'progress', component: ProgressComponent, data:{tituloPage:'Progress Bar'} },
            // { path: 'promesas', component: PromesasComponent, data:{tituloPage:'Promesas'} },
            // { path: 'rxjs', component: RxjsComponent, data:{tituloPage:'Rxjs'} },

            //tienda

            { path: 'blog', component: BlogIndexComponent, data:{tituloPage:'Blogs '} },
            { path: 'blog/edit/:id', component: BlogEditComponent, data:{tituloPage:'Blog Edit '} },
            { path: 'blog/create', component: BlogEditComponent, data:{tituloPage:'Blog Create '} },

            { path: 'page', component: PageIndexComponent, data:{tituloPage:'Pages '} },
            { path: 'page/edit/:id', component: PageEditComponent, data:{tituloPage:'Page Edit '} },
            { path: 'page/create', component: PageEditComponent, data:{tituloPage:'Page Create '} },

            { path: 'categoria', component: CatIndexComponent, data:{tituloPage:'Categorias '} },
            { path: 'categoria/edit/:id', component: CatEditComponent, data:{tituloPage:'Categoría Edit '} },
            { path: 'categoria/create', component: CatEditComponent, data:{tituloPage:'Categoría Create '} },

            { path: 'gallery', component: GalleryIndexComponent, data:{tituloPage:'Gallery '} },
            { path: 'gallery/edit/:id', component: GalleryEditComponent, data:{tituloPage:'Gallery Edit '} },
            { path: 'gallery/create', component: GalleryEditComponent, data:{tituloPage:'Gallery Create '} },

            // { path: 'marca', component: MarcaIndexComponent, data:{tituloPage:'Marcas '} },
            // { path: 'marca/edit/:id', component: MarcaEditComponent, data:{tituloPage:'Marca Edit '} },
            // { path: 'marca/create', component: MarcaEditComponent, data:{tituloPage:'Marca Create '} },

            { path: 'configuracion', component: ViewComponent, data:{tituloPage:'Configuracion '} },
            { path: 'configuracion/edit/:id', component: ConfigSiteComponent, data:{tituloPage:'Configuracion '} },

            { path: 'producto', component: ProdIndexComponent, data:{tituloPage:'Producto '} },
            { path: 'producto/edit/:id', component: ProdEditComponent, data:{tituloPage:'Producto Edit'} },
            { path: 'producto/create', component: ProdEditComponent, data:{tituloPage:'Producto Create'} },
            // { path: 'producto/galeria/:id', component: GaleriaProductoComponent, data:{tituloPage:'Galeria '} },

            { path: 'curso', component: CursoIndexComponent, data:{tituloPage:'Curso '} },
            { path: 'curso/edit/:id',  component: CursoEditComponent, data:{tituloPage:'Curso Edit'} },
            { path: 'curso/create',  component: CursoEditComponent, data:{tituloPage:'Curso Create'} },
            { path: 'curso/videos/view',  component: CursoVideoviewComponent, data:{tituloPage:'Curso Video Edit'} },
            { path: 'curso/videos/view/:id',  component: CursoVideosComponent, data:{tituloPage:'Curso Video Edit'} },
            { path: 'curso/videos/:curso_id',  component: CursoVideosComponent, data:{tituloPage:'Curso Video Edit'} },


            // { path: 'cupon', component: CuponComponent, data:{tituloPage:'Cupon'} },


            { path: 'promocion', component: PromocionComponent, data:{tituloPage:'Promocion '} },
            { path: 'promocion/create',  component: PromoeditComponent, data:{tituloPage:'Promocion '} },
            { path: 'promocion/edit/:id',  component: PromoeditComponent, data:{tituloPage:'Promocion '} },

            { path: 'slider', component: SliderComponent, data:{tituloPage:'Slider Home '} },
            { path: 'slider/create',   component: SlidereditComponent, data:{tituloPage:'Slider Home '} },
            { path: 'slider/edit/:id',   component: SlidereditComponent, data:{tituloPage:'Slider Home '} },

            { path: 'postal', component: PostalComponent, data:{tituloPage:'Postal'} },

            { path: 'contacto', component: ContactoComponent, data:{tituloPage:'Contacto'} },

            // {path: 'tikets/modulo', component: AdminTicketComponent, data:{tituloPage:'Ticket'}},
            // {path: 'tikets/modulo/chat/:id', component: AdminChatComponent, data:{tituloPage:'Ticket'}},

            // {path: 'cancelacion/modulo', component: IndexCancelacionComponent , data:{tituloPage:'Cancelación'}},
            // {path: 'cancelacion/modulo/detalle/:id', component: DetalleCancelacionComponent , data:{tituloPage:'Cancelación'}},

            // {path: 'ventas/modulo', component: AdminVentasComponent , data:{tituloPage:'Ventas'}},
            // {path: 'ventas/modulo/invoice/:id', component: InvoiceComponent , data:{tituloPage:'Ventas'}},
            // {path: 'ventas/modulo/detalle/:id', component: AdminDetalleventasComponent , data:{tituloPage:'Ventas'}},

            // {path: 'ingresos', component: IndexIngresoComponent , data:{tituloPage:'Ingresos'}},
            // {path: 'ingresos/registro', component: CreateIngresoComponent , data:{tituloPage:'Ingresos'}},
            // {path: 'ingresos/detalle/:id', component: DetalleIngresoComponent , data:{tituloPage:'Ingresos'}},

            //mantenimientos
            // { path: 'hospitales', component: HospitalesComponent, data:{tituloPage:'Mantenimiento de Hospitales '} },
            // { path: 'medicos', component: MedicosComponent, data:{tituloPage:'Mantenimiento de Medicos '} },
            // { path: 'medico/:id', component: MedicoComponent, data:{tituloPage:'Mantenimiento de Medico '} },

            //rutas de admin
            { path: 'usuarios', component: UsuariosComponent, data:{tituloPage:'Mantenimiento de Usuarios '} },
            // { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data:{tituloPage:'Mantenimiento de Usuarios '} },
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
