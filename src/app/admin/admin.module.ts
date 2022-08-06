import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaIndexComponent } from './marca/marca-index/marca-index.component';
import { MarcaEditComponent } from './marca/marca-edit/marca-edit.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CatIndexComponent } from './categoria/cat-index/cat-index.component';
import { CatEditComponent } from './categoria/cat-edit/cat-edit.component';
import { IconosService } from '../services/iconos.service';
import { ProdIndexComponent } from './proucto/prod-index/prod-index.component';
import { ProdEditComponent } from './proucto/prod-edit/prod-edit.component';
import { CategoriaService } from '../services/categoria.service';
import { MarcaService } from '../services/marca.service';
import { ConfigSiteComponent } from './config-site/config-site.component';
import { PromocionComponent } from './promocion/promocion.component';
import { PostalComponent } from './postal/postal.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PromoeditComponent } from './promocion/promoedit/promoedit.component';
import { CursoEditComponent } from './curso/curso-edit/curso-edit.component';
import { CursoIndexComponent } from './curso/curso-index/curso-index.component';

// import { ColorComponent } from './proucto/color/color.component';
// import { SelectorComponent } from './proucto/selector/selector.component';
// import { PapeleraComponent } from './proucto/papelera/papelera.component';
// import { CuponComponent } from './cupon/cupon.component';
// import { InvoiceComponent } from './ventas/invoice/invoice.component';
// import { AdminDetalleventasComponent } from './ventas/admin-detalleventas/admin-detalleventas.component';
// import { AdminVentasComponent } from './ventas/admin-ventas/admin-ventas.component';
// import { CreateIngresoComponent } from './ingreso/create-ingreso/create-ingreso.component';
// import { DetalleIngresoComponent } from './ingreso/detalle-ingreso/detalle-ingreso.component';
// import { IndexIngresoComponent } from './ingreso/index-ingreso/index-ingreso.component';
// import { GaleriaProductoComponent } from './proucto/galeria-producto/galeria-producto.component';
// import { AdminChatComponent } from './ticket/admin-chat/admin-chat.component';
// import { AdminTicketComponent } from './ticket/admin-ticket/admin-ticket.component';
// import { DetalleCancelacionComponent } from './cancelacion/detalle-cancelacion/detalle-cancelacion.component';
// import { IndexCancelacionComponent } from './cancelacion/index-cancelacion/index-cancelacion.component';

//pluggins

import { NgxTinymceModule } from 'ngx-tinymce';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
import { SliderComponent } from './slider/slider.component';
import { SlidereditComponent } from './slider/slideredit/slideredit.component';


@NgModule({
  declarations: [
    MarcaIndexComponent,
    MarcaEditComponent,
    CatIndexComponent,
    CatEditComponent,
    ProdIndexComponent,
    ProdEditComponent,
    ConfigSiteComponent,
    PromocionComponent,
    PromoeditComponent,
    PostalComponent,
    ContactoComponent,
    CursoEditComponent,
    CursoIndexComponent,
    SlidereditComponent,
    SliderComponent,
    // CuponComponent,
    // ColorComponent,
    // SelectorComponent,
    // PapeleraComponent,
    // InvoiceComponent,
    // AdminVentasComponent,
    // AdminDetalleventasComponent,
    // IndexIngresoComponent,
    // CreateIngresoComponent,
    // DetalleIngresoComponent,
    // AdminTicketComponent,
    // AdminChatComponent,
    // GaleriaProductoComponent,
    // IndexCancelacionComponent,
    // DetalleCancelacionComponent
  ],
  exports: [
    MarcaIndexComponent,
    MarcaEditComponent,
    CatIndexComponent,
    CatEditComponent,
    ProdIndexComponent,
    ProdEditComponent,
    ConfigSiteComponent,
    PromocionComponent,
    PostalComponent,
    ContactoComponent,
    PromoeditComponent,
    CursoEditComponent,
    CursoIndexComponent,
    SlidereditComponent,
    SliderComponent,
    // ColorComponent,
    // SelectorComponent,
    // PapeleraComponent,
    // CuponComponent,
    // InvoiceComponent,
    // AdminVentasComponent,
    // AdminDetalleventasComponent,
    // IndexIngresoComponent,
    // CreateIngresoComponent,
    // DetalleIngresoComponent,
    // AdminTicketComponent,
    // AdminChatComponent,
    // GaleriaProductoComponent,
    // IndexCancelacionComponent,
    // DetalleCancelacionComponent
  ],



  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxTinymceModule,
    NgxDropzoneModule,
    PdfViewerModule,
    NgxPaginationModule
  ],
  providers:[
    IconosService,
    MarcaService,
    CategoriaService
  ]
})
export class AdminModule { }
