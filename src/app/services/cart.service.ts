import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data: Product[] = [
    {id: 0, name: 'Pizza Salami', price: 40000, amount: 1 },
    {id: 1, name: 'Pizza Classis', price: 30000, amount: 1 },
    {id: 2, name: 'Sliced Breed', price: 18000, amount: 1 },
    {id: 3, name: 'Salad', price: 20000, amount: 1 },
    {id: 4, name: 'Ice Tea', price: 9000, amount: 1 }
  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }

  getItems() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (const i  of this.cart) {
      if (i.id === product.id) {
        i.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (const [index, i]  of this.cart.entries()) {
      if (i.id === product.id) {
        i.amount -= 1;
        // tslint:disable-next-line: triple-equals
        if (i.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (const [index, i] of this.cart.entries()) {
      if (i.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - i.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
