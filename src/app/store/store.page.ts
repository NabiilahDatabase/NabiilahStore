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

  id = null;
  cart: Cart[];
  cartLenght: number;
  items: Produk[];

  sliderConfig = {
    spaceBetwen: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  };

  mainuser: AngularFirestoreDocument;
  userPost: any;
  sub;
  posts;
  coba: Produk[];
  task;
  username: string;
  profilePic: string;

  constructor(
    private aff: AngularFireFunctions,
    private afs: AngularFirestore,
    private user: UserService,
    private cartService: CartService,
    private router: Router) {
      this.mainuser = this.afs.doc(`users/${this.user.getUID()}`);
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.posts = event.posts;
        console.log('posting reg');
      });
      this.id = this.user.getUID();
    }

  goTo(postID: string) {
    this.router.navigate(['/main/barang/' + postID]);
  }

  ngOnInit() {
/*
    const getPost = this.aff.httpsCallable('getPost');
    this.task = getPost({}).subscribe(data => {
      this.coba = data;
      console.log('posting firebase');
      console.log(data);
    }); */

    this.task = this.cartService.getProducts().subscribe(res => {
      this.items = res;
    });

    this.cartService.getCarts().subscribe(res => {
      this.cart = res;
      this.cartLenght = res.length;
    });

    this.cartService.getCart(this.id).subscribe(res => {
      this.coba = res;
    });
  }

  OnDestroy() {
    this.task.unsubscribe();
  }

  addToCart(product) {
    this.cartService.addCart(product, this.id);
  }

  openCart() {
    this.router.navigate(['/main/cart']);
  }
}
