import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css'],
  providers: [ProductoService]
})
export class ProductosListComponent implements OnInit {

  public titulo: string;
  public productos: Producto[];
  public seguro: number;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService
  ) {
    this.titulo = 'Listado de productos';
    this.seguro = null;
  }

  ngOnInit() {
    console.log('productos-list.component.ts cargado');
    this.getProductos();
  }

  getProductos() {
    this._productoService.getProductos().subscribe(
      result => {

        if (result.code != 200) {
          console.log(result);
        } else {
          this.productos = result.data;
        }

      },
      error => {
        console.log(<any>error);
      }
    );
  }
  onDeleteProducto(id) {
    this._productoService.deleteProducto(id).subscribe(
      result => {
        if (result.code == 200) {
          this.getProductos()
        } else {
          alert('Error al borrar el producto');
          console.log(result);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  confirmar(id) {
    if (this.seguro) {
      this.seguro = null;
    } else {
      this.seguro = id;
    }
  }
}



