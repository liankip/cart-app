import { CartModalPage } from './../pages/cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cart = [];
  items = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(private cartService: CartService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  async openCart() {
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }
}
