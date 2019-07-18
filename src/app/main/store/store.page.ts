import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { CartService, Produk, Cart } from '../../services/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  cartData: Observable<Cart[]>;
  cart: Cart[];
  cartLenght: number;

  produkData: Observable<Produk[]>;
  produk: Produk[];

  sliderConfig = {
    spaceBetwen: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  };

  task; task2;

  constructor(
    private cartService: CartService,
    private router: Router) {}

  goTo(postID: string) {
    this.router.navigate(['/main/barang/' + postID]);
  }

  ngOnInit() {
    this.produkData = this.cartService.getProducts();
    this.task = this.produkData.subscribe(res => {
      this.produk = res;
    });
    this.cartData = this.cartService.getCarts();
    this.task2 = this.cartData.subscribe(res => {
      this.cart = res;
      this.cartLenght = 0;
      for (const obj of res) {
        this.cartLenght += obj.jumlah;
      }
    });
  }

  OnDestroy() {
    this.task.unsubscribe();
    this.task2.unsubscribe();
  }

  addToCart(product) {
    this.cartService.addCart(product);
  }

  openCart() {
    this.router.navigate(['/main/cart']);
  }
}
