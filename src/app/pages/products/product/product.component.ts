import { Component, Input, Output,OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() productSon!: Product; //recibe el hijo la variable productSon del padre que es un Product
  @Output() addToCartClick = new EventEmitter<Product>(); 
  /*recibe la funcion del padre y la declara como un 
  EventEmitter que mandara un event, en este caso un 
  product, tiene el nombre de la funcion entre () del 
  html del padre */
  @Output() mostrarPrecio = new EventEmitter<number>;
  
  onClick(): void{
    this.addToCartClick.emit(this.productSon)
    this.mostrarPrecio.emit(this.productSon.price)
  }
}
