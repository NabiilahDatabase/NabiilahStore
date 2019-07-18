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

  cartTmp: Cart;
  cartBox: Cart[];
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
    this.cart = db.collection<Cart>('users');
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

  async addCart(item) {
    try {
      const doc = await this.cart.doc(this.uid).collection('cart').doc<Cart>(item.id).ref.get();
      if (doc.exists) {
        const data: Cart = {
          id: doc.data().id,
          nama: doc.data().nama,
          harga: doc.data().harga,
          url: doc.data().url,
          jumlah: doc.data().jumlah + 1
        };
        this.cart.doc(this.uid).collection('cart').doc<Cart>(item.id).update(data);
        // console.log('Tambah jumlah');
      } else {
        const data: Cart = {
          id: item.id,
          nama: item.nama,
          harga: item.harga,
          url: item.url,
          jumlah: 1
        };
        this.cart.doc(this.uid).collection('cart').doc(item.id).set(data, { merge: true });
        // console.log('Masuk Cartbaru');
      }
    } catch (error) {
      console.log('Error getting Cart:', error);
    }
  }

  async updateCart(cartItems: Cart, numb: number) {
    try {
      const doc = await this.cart.doc(this.uid).collection('cart').doc<Cart>(cartItems.id).ref.get();
      if (doc.data().jumlah > 0) {
        if (doc.data().jumlah === 1 && numb === -1) {
          this.cart.doc(this.uid).collection('cart').doc(cartItems.id).delete();
          // console.log('Hapus Barang');
        } else {
          const data: Cart = {
            id: doc.data().id,
            nama: doc.data().nama,
            harga: doc.data().harga,
            url: doc.data().url,
            jumlah: doc.data().jumlah + numb
          };
          this.cart.doc(this.uid).collection('cart').doc<Cart>(cartItems.id).update(data);
          // console.log('Jumlah barang ' + numb);
        }
      }
    } catch (error) {
      console.log('Error getting Cart:', error);
    }
  }

}
