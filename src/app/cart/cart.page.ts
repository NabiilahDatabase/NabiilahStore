import { Component, OnInit } from '@angular/core';
import { CartService, Cart } from '../cart.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  productSum: number;
  totalan = 0;
  selectedItems: Cart[];
  produk: Cart[];

  constructor(
    private cartSevice: CartService,
    private user: UserService
    ) { }

  ngOnInit() {
    this.cartSevice.getCarts().subscribe(res => {
      this.produk = res;
      for (const obj of res) {
        this.productSum += obj.jumlah;
        this.totalan += obj.harga;
      }

      /*
      const selected = {};
      for (const obj of res) {
        if (selected[obj.id]) {
          selected[obj.id].jumlah++;
        } else {
          selected[obj.id] = {...obj, jumlah: 1};
        }
      }
      */
      // this.selectedItems = Object.keys(selected).map(key => selected[key]);
      // this.total = this.selectedItems.reduce((a, b) => a + (b.jumlah * b.harga), 0);
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

