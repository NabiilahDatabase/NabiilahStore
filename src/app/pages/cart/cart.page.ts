import { Component, OnInit } from '@angular/core';
import { CartService, Cart } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartDataStream: Observable<Cart[]>;
  productSum: number;
  totalan: number;
  selectedItems: Cart[];
  cartBox: Cart[];

  task;

  constructor(
    public cartService: CartService
    ) {}

  ngOnInit() {
    this.cartDataStream = this.cartService.getCarts();
    this.task = this.cartDataStream.subscribe(res => {
      this.cartBox = res;
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

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.task.unsubscribe();
  }

  updateCart(item, numb) {
    this.cartService.updateCart(item, numb);
  }
}

