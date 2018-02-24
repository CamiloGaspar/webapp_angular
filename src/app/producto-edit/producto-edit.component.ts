import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'app-producto-edit',
  templateUrl: '../producto-add/producto-add.component.html',
  styleUrls: ['../producto-add/producto-add.component.css'],
  providers: [ProductoService]
})
export class ProductoEditComponent implements OnInit {

  public titulo: string;
  public producto: Producto;
  public filesToUpload: Array<File>;
  public resultUpload;
  public isEdit: boolean;

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.titulo = 'Editar Producto';
    this.producto = new Producto(1, '', '', 0, '');
    this.filesToUpload = new Array<File>();
    this.isEdit = true;
  }

  ngOnInit() {
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

  onSubmit() {
    console.log(this.producto);

    if (this.filesToUpload.length >= 1) {
      this._productoService.makeFileRequest(GLOBAL.url + 'upload-file', [], this.filesToUpload).then((result) => {
        this.resultUpload = result;
        console.log(this.resultUpload);
        this.producto.imagen = this.resultUpload.filename;
        this.updateProducto();
      }, (error) => {
        console.log(error);
      });
    } else {
      this.updateProducto();
    }

  }

  updateProducto() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];      
      this._productoService.editProducto(id, this.producto).subscribe(
        result => {
          if (result.code == 200) {
            this._router.navigate(['/producto', id])
          } else {
            console.log(result);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
