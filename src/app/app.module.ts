import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

// RUTAS
import { routing, appRoutingProviders } from './app.routing';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductoService } from './services/producto.service';
import { ProductoAddComponent } from './producto-add/producto-add.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { NumMilesPipe } from './pipes/num-miles.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ProductosListComponent,
    ProductoAddComponent,
    ProductoDetailComponent,
    ProductoEditComponent,
    NumMilesPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ModalModule.forRoot(),
    routing
  ],
  providers: [
    appRoutingProviders,
    ProductoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
