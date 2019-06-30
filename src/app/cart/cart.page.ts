import { Component, OnInit } from '@angular/core';
import { Produk, CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  product: Produk[];
  selectedItems = [];
  total = 0;

  constructor(private cartSevice: CartService) { }

  ngOnInit() {
      this.cartSevice.getProducts().subscribe(res => {
      this.product = res;
    });
  }

  remove(item) {
    this.cartSevice.removeProduct(item.id);
  }
/*
    const items = this.cartSevice.getCart();
    const selected = {};
    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = {...obj, count: 1};
      }
    }

    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    console.log('items=', this.selectedItems);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
*/
}

