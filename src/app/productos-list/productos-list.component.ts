import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css'],
  providers: [ProductoService, BsModalService]
})
export class ProductosListComponent implements OnInit {

  public titulo: string;
  public productos: Producto[];
  public seguro: number;
  public producto: Producto;
  modalRef: BsModalRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService,
    private modalService: BsModalService
  ) {
    this.titulo = 'Listado de productos';
    this.seguro = null;
    this.productos = null;
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

  public verDetalle(template: TemplateRef<any>, idItem: number) {
    for (const item of this.productos) {
      if (idItem === item.id) {
        this.producto = item;
        break;
      }
    }
    this.modalRef = this.modalService.show(template);
  }

  confirmar(id) {
    if (this.seguro) {
      this.seguro = null;
    } else {
      this.seguro = id;
    }
  }
}



