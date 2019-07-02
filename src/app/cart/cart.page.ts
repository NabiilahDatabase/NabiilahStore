import { Component, OnInit } from '@angular/core';
import { Produk, CartService, Cart } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  productSum: number;
  selectedItems: Cart[];
  total = 0;

  constructor(private cartSevice: CartService, private user: UserService) { }

  ngOnInit() {
    this.cartSevice.getCart(this.user.getUID()).subscribe(res => {
      // this.product = res;
      this.productSum = res.length;

      const selected = {};
      for (const obj of res) {
        if (selected[obj.id]) {
          selected[obj.id].jumlah++;
        } else {
          selected[obj.id] = {...obj, jumlah: 1};
        }
      }
      console.log(selected);
      this.selectedItems = Object.keys(selected).map(key => selected[key]);
      console.log('items=', this.selectedItems);
      this.total = this.selectedItems.reduce((a, b) => a + (b.jumlah * b.harga), 0);
    });

  }

  remove(item) {
    this.cartSevice.removeCart(this.user.getUID(), item.id);
  }

}

