import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css'],
  providers: [ProductoService]
})
export class ProductoAddComponent implements OnInit {

  public titulo: string;
  public producto: Producto;

  constructor() {
    this.titulo = 'Crear un nuevo producto';
    this.producto = new Producto(0,'','',0,'');
   }

  ngOnInit() {
    console.log('Este producto-add.component.ts cargado');
  }

  onSubmit(){
    console.log(this.producto);
  }

}
