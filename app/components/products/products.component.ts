import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // ALMACENARA LOS PRODUCTOS DE FIREBASE
  products = [];
  // ALMACENA SOLO EL PRODUCTO EDITADO
  editingProduct: Product;
  // MOSTRARA NUESTRO ELEMENTO EDITADO
  editing: boolean = false;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    // ACCEDIMOS AL SERVICIO PARA UTILIZAR NUESTROS METODOS
    // NOS SUSCRIBIMOS PARA ESTAR ATENTOS A LOS CAMBIOS
    this.productService.getProduct().subscribe(productsFirebase => {
      console.log(productsFirebase);
      // LE PASAMOS LOS DOCUMENTOS DE FIREBASE A NUESTRA VARIABLE products
      this.products = productsFirebase;
    });
  }

  // METODOS
  deleteProduct(prod) {
    Swal.fire({
      title: 'Esta Seguro?',
      text: "Eliminara el Producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
      // LLAMAMOS EL METODO Y LE PASAMOS LA DATA DEL ELEMENTO SELECCIONADO
      this.productService.deleteProduct(prod);
        Swal.fire(
          'Eliminado!',
          'Producto eliminado con exito!',
          'success'
        )
      }
    });
  }
  // Editar un producto
  editProduct(prod) {
    console.log('Estamos editando');
    this.editingProduct = prod;
    this.editing = !this.editing;
  }
  // GUARDAMOS EL PRODUCTO
  updateProduct() {
    this.productService.updateProduct(this.editingProduct);
    this.editingProduct = {} as Product;
    this.editing = !this.editing;
  }
}
