import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = [
    {
      category: 'Pizza',
      expended: true,
      products: [
        {id: 0, name: 'Salami', price: 9000},
        {id: 1, name: 'Classic', price: 8000},
        {id: 2, name: 'Tuna', price: 12000},
        {id: 3, name: 'Hawai', price: 10000}
      ]
    },
  ];

  private cart = [];

  constructor() { }

  getProduct() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }
}
