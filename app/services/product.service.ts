import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  product: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;
  constructor(public db: AngularFirestore) {
    // ACCEDEMOS A LOS DATOS DENTRO DEL DOCUMENTO NO TRAE METADATOS
    // this.product = this.db.collection('products').valueChanges();
    //  OBTENEMOS EL ID DE LOS PRODUCTOS DE NUETSRA COLECCION
    // ESTA ES LA FORMA CORRECTA DE OBTENER LOS METADATOS DE LA COLECCION
    this.productsCollection = this.db.collection('products');
    this.product = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
  }

  // METODOS
  // OBTENER PRODUCTOS
  getProduct() {
    return this.product;
  }
  // AGREGAMOS UN NUEVO PRODUCTO O DOCUMENTO
  addProduct(product: Product) { 
    this.productsCollection.add(product);
  }
  // ELIMINAMOS UN PRODUCTO
  deleteProduct(product: Product) {
    // OBTENEMOS EL ID DEL DOCUMENTO
    this.productDoc = this.db.doc(`products/${product.id}`);
    // Procedemos a eliminar
    this.productDoc.delete();
  }
  // ACTUALIZAMOS UN PRODUCTO O DOCUMENTO
  updateProduct(product: Product) {
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.update(product);
  }
}
