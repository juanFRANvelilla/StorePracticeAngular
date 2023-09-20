import { Component, OnInit, inject } from '@angular/core';
import { Store } from '../stores/interfaces/store.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, concatAll, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit{
  stores$! : Observable<Store[]>
  data$! : Observable<Store>;
    private url = 'http://localhost:3000/stores'
    private http = inject(HttpClient);

    ngOnInit() {
      this.stores$ = this.http.get<Store[]>(this.url)
      this.stores$.subscribe((x:Store[])=> console.log(x));


      /*this.http.get<Store[]>(this.url).pipe(
        tap((stores: Store[]) => {
          console.log('tiendas:', stores)
          this.stores$ = of(stores)
          
        })
      ).subscribe()*/
     

      /*this.http.get<Store[]>(this.url).pipe(
        tap((stores: Store[]) => {
          console.log('tiendas:', stores)
          this.stores$ = stores
        })
      ).subscribe()*/

      this.data$ = this.http.get<Store[]>(this.url).pipe(
        switchMap((stores: Store[]) => {
          const randomIndex = Math.floor(Math.random() * stores.length);
          const randomStore = stores[randomIndex];
          return this.http.get<Store>(`${this.url}/${randomStore.id}`);
        })
      )
      this.data$.subscribe((store) => console.log(store))
    }
}


