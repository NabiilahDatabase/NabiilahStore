import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { CartService, Produk, Cart } from '../cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  id;
  cart: Cart[];
  cartLenght: number;
  produk: Produk[];

  sliderConfig = {
    spaceBetwen: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  };

  task; task2;

  constructor(
    private user: UserService,
    private cartService: CartService,
    private router: Router) {
      this.id = this.user.getUID();
    }

  goTo(postID: string) {
    this.router.navigate(['/main/barang/' + postID]);
  }

  ngOnInit() {
    this.task = this.cartService.getProducts().subscribe(res => {
      this.produk = res;
    });
    this.task2 = this.cartService.getCarts().subscribe(res => {
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
