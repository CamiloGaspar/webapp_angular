import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';


@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
  providers: [ProductoService]
})
export class ProductoDetailComponent implements OnInit {

  public producto: Producto;

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    console.log('producto-detail.ts cargado');
    this.getProducto();
  }

  getProducto() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._productoService.getProducto(id).subscribe(
        response => {
          if (response.code == 200) {
            this.producto = response.data;
          } else {
            this._router.navigate(['/productos']);
          }
        }, error => {
          console.log(<any>error);
        });
    });
  }

}
