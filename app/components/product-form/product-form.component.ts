import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product = {} as Product;
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

  // METODOS
  // Agregamos un producto
  addProduct() {
    console.log(this.product);
    if (this.product.nombre !== "" && this.product.descripcion !== "" && this.product.precio !== 0) {
      this.productService.addProduct(this.product);
      this.product = {} as Product;
    }
  }
}
