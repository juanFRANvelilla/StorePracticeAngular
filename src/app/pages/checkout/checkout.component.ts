import { Component, OnInit } from '@angular/core';
import { StoresService } from '../stores/services/stores.service';
import { Store } from '../stores/interfaces/store.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private storesService: StoresService) {}

  model = {
    name: '',
    store: '',
    shoppingAddress: '',
    city: ''
  };
  stores: Store[] = [];
  ngOnInit() {
    this.storesService.getStores().pipe(
      tap((data:Store[]) => {
        this.stores = data
      })
    ).subscribe;
  }

  pickupOrDelivery(value: boolean): void {
    console.log(value);
  }

  onSubmit(){
    console.log('chechout dfjsdlf')
  }
}
