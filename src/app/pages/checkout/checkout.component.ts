import { Component, OnInit } from '@angular/core';
import { StoresService } from '../stores/services/stores.service';
import { Store } from '../stores/interfaces/store.interface';
import { tap } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from './interfaces/order.class';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private storesService: StoresService, private orderService: OrderService) {}

  isPickup!: boolean;
  private getCurrencyDate(){
    return new Date().toLocaleDateString();
  }

  model = {
    name: '',
    date: this.getCurrencyDate(),
    store: '',
    shippingAddress: '',
    city: '',
    pickup: false
  };
  orders: Order[] = [];
  stores: Store[] = [];
  ngOnInit() {
    this.isPickup = false;
    this.storesService.getStores().pipe(
      tap((data:Store[]) => {
        this.stores = data
      })
    ).subscribe;
    console.log('stores: ', this.stores)
  }

  pickupOrDelivery(value: boolean): void {
    this.isPickup = value;
    this.model.pickup = value;
  }

  onSubmit(){
    this.orderService.getOrders().pipe(
      tap((data:Order[]) => {
        this.orders = data
      })
    ).subscribe;
    console.log(this.orders)
    console.log(this.model)
    const order = new Order(
      
      2, // ID
      this.model.name, // Nombre
      this.model.date, // Fecha (asegúrate de que model.date sea de tipo Date)
      this.model.store, // Tienda
      this.model.shippingAddress, // Dirección de envío
      this.model.city, // Ciudad
      this.model.pickup // Recogida
    );
    /*this.orderService.putOrder(order)
    .pipe(
      tap(res => console.log(res)),
    )
    .subscribe();*/
  }

  selectedOption: string = 'pickup';
}
