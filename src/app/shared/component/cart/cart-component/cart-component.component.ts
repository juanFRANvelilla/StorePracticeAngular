import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css']
})
export class CartComponentComponent implements OnInit{
  constructor(private shoppingCartService: ShoppingCartService){}
  
  quantity$ = this.shoppingCartService.quantitAction$;
  total$ = this.shoppingCartService.totalAction$;
  cart$ = this.shoppingCartService.cartAction$;
  
  cart: Product[] = [];

  ngOnInit(): void {
    this.cart$.subscribe((data: Product[]) => {this.cart=data});
  }

  getProducts():Product[]{
    return this.cart;
  }
}
