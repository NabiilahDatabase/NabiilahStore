import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

export interface Produk {
  id: string;
  nama: string;
  disk: string;
  harga: number;
  stock: number;
  likes;
  url: string;
}

export interface Cart {
  id: string;
  nama: string;
  harga: number;
  url: string;
  jumlah: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsCollections: AngularFirestoreCollection<Produk>;
  private products: Observable<Produk[]>;

  private cart: AngularFirestoreCollection<Cart>;
  private cartItems: Observable<Cart[]>;

  private afs: AngularFirestore;
  private user: UserService;

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

    this.cart = db.collection<Cart>('cart');
    this.cartItems = this.cart.snapshotChanges().pipe(
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
  getCarts() {
    return this.cartItems;
  }

  getProduct(id) {
    return this.productsCollections.doc(id).valueChanges();
  }
  getCart(uid) {
    return this.cart.doc(uid).collection<Produk>('cart').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
/*
    this.cart.doc<Cart>(id).valueChanges().subscribe(res => {
            console.log(res['cart'] + ' coba');
            // tslint:disable-next-line: no-string-literal
            return res['cart'];
          });
*/
  }

  updateProduct(product: Produk, id: string) {
    return this.productsCollections.doc(id).update(product);
  }
  updateCart(cartItems: Cart, id: string) {
    return this.cart.doc(id).update(cartItems);
  }

  addProduct(product: Produk) {
    this.productsCollections.add(product);
  }
  addCart(cartItems: Cart, id: string) {
    this.cart.doc(id).collection('cart').add(cartItems);
  }

  removeProduct(id: string) {
    return this.productsCollections.doc(id).delete();
  }
  removeCart(id: string) {
    return this.cart.doc(id).delete();
  }
}
