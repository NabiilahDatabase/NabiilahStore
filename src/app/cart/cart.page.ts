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
  totalan: number;
  selectedItems: Cart[];
  cart: Cart[];

  constructor(
    private cartService: CartService
    ) {
      this.cartService.getCarts().subscribe(res => {
        this.cart = res;
        this.totalan = 0;
        for (const obj of res) {
          this.totalan += (obj.harga * obj.jumlah);
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

  ngOnInit() {
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
  }

  updateCart(item, numb) {
    this.cartService.updateCart(item, numb);
  }
}

