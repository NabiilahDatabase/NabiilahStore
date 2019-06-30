import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Produk {
  id: string;
  nama: string;
  disk: string;
  harga: number;
  stock: number;
  likes;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsCollections: AngularFirestoreCollection<Produk>;
  private products: Observable<Produk[]>;

  constructor(db: AngularFirestore) {
    this.productsCollections = db.collection<Produk>('produk');
    this.products = this.productsCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getProducts() {
    return this.products;
  }

  getProduct(id) {
    return this.productsCollections.doc<Produk>(id).valueChanges();
  }

  updateProduct(product: Produk, id: string) {
    return this.productsCollections.doc(id).update(product);
  }

  addProduct(product: Produk) {
    this.productsCollections.add(product);
  }

  removeProduct(id: string) {
    return this.productsCollections.doc(id).delete();
  }
}
