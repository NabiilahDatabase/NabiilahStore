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

  cartBox: Cart;
  uid: string;

  private afs: AngularFirestore;

  constructor(db: AngularFirestore, user: UserService) {
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

    this.uid = user.getUID();
    this.cart = db.collection<Cart>('cart');
    this.cartItems = this.cart.doc(user.getUID()).collection<Cart>('cart').snapshotChanges().pipe(
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
  getCart(pid) {
    return this.cart.doc(this.uid).collection('cart').doc<Cart>(pid).valueChanges();
/*
    this.cart.doc<Cart>(id).valueChanges().subscribe(res => {
            console.log(res['cart'] + ' coba');
            // tslint:disable-next-line: no-string-literal
            return res['cart'];
          });
*/
  }

  async getJumlah(pid) {
    try {
      const doc = await this.cart.doc(this.uid).collection('cart').doc<Cart>(pid).ref.get();
      if (doc.exists) {
        console.log('Doc data: ', doc.data());
      } else {
        console.log('Document not exist');
      }
    } catch (error) {
      console.log('Error getting document:', error);
    }
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
  addCart(cartItems: Produk, uid: string) {
    let jum: Cart;
    this.getCart(cartItems.id).subscribe(res => {
      jum = res;
    });
    console.log(jum);
    this.cartBox = {
      id: cartItems.id,
      nama: cartItems.nama,
      harga: cartItems.harga,
      jumlah: 1,
      url: cartItems.url
    };
    this.cart.doc(uid).collection('cart').doc(cartItems.id).set(this.cartBox, { merge: true });
  }

  removeProduct(id: string) {
    return this.productsCollections.doc(id).delete();
  }
  removeCart(uid: string, pid: string) {
    console.log(pid + ' dihapus');
    return this.cart.doc(uid).collection('cart').doc(pid).delete();
  }
}
