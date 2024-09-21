import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from 'src/app/material.module';
import { ExampleSharedComponentComponent } from 'src/app/shared/component/example-shared-component/example-shared-component.component';
import { ExampleModule } from '../example/example.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ExampleSharedComponentComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule
  ]
})
export class ProductsModule { }
