import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css'],
  providers: [ProductoService]
})
export class ProductoAddComponent implements OnInit {

  public titulo: string;
  public producto: Producto;
  public filesToUpload: Array<File>;
  public resultUpload;

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.titulo = 'Crear un nuevo producto';
    this.producto = new Producto(0, '', '', 0, '');
    this.filesToUpload = new Array<File>();
  }

  ngOnInit() {
    console.log('Este producto-add.component.ts cargado');
  }

  onSubmit() {
    console.log(this.producto);

    if (this.filesToUpload.length >= 1) {
      this._productoService.makeFileRequest(GLOBAL.url + 'upload-file', [], this.filesToUpload).then((result) => {
        console.log(result);
        this.resultUpload = result;
        this.producto.imagen = this.resultUpload.filename;
        this.saveProducto();
      }, (error) => {
        console.log(error);
      });
    } else {
      this.saveProducto();
    }

  }

  saveProducto() {
    this._productoService.addProducto(this.producto).subscribe(
      result => {
        if (result.code == 200) {
          this._router.navigate(['/productos'])
        } else {
          console.log(result);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

}
