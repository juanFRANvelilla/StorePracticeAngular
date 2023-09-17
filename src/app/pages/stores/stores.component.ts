import { Component, OnInit } from '@angular/core';
import { StoresService } from './services/stores.service';
import { Store } from './interfaces/store.interface';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit{
  stores!: Store[];
  constructor(private storeService: StoresService){}
  ngOnInit(): void {
    this.storeService.getStores().subscribe(
      (stores: Store[]) => {
        this.stores = stores;
        console.log(this.stores); // Aquí puedes acceder a los datos cargados
      },
      (error) => {
        console.error('Error al cargar las tiendas', error);
      }
    );
  }
  
}
