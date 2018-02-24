import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductoAddComponent } from './producto-add/producto-add.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';

const appRoutes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'producto/:id', component: ProductoDetailComponent },
    { path: 'crear-producto', component: ProductoAddComponent },
    { path: 'editar-producto/:id', component: ProductoEditComponent },
    { path: 'productos', component: ProductosListComponent },
    { path: '**', component: ErrorComponent }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

