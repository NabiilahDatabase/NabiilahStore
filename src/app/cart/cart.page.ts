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
    this.cartSevice.getCarts().subscribe(res => {
      // this.product = res;
      console.log(res);
      this.productSum = res.length;

      const selected = {};
      for (const obj of res) {
        if (selected[obj.id]) {
          selected[obj.id].jumlah++;
        } else {
          selected[obj.id] = {...obj, jumlah: 1};
        }
      }
      this.selectedItems = Object.keys(selected).map(key => selected[key]);
      this.total = this.selectedItems.reduce((a, b) => a + (b.jumlah * b.harga), 0);
    });

  }

  remove(item) {
    this.cartSevice.removeCart(this.user.getUID(), item.cid);
    console.log(item);
  }

  test(text) {
    console.log(text);
  }

}

