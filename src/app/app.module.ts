import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './shared/component/header/header.component';
import {HttpClientModule} from "@angular/common/http"
import { CartComponentComponent } from './shared/component/cart/cart-component/cart-component.component';
import { ExampleSharedComponentComponent } from './shared/component/example-shared-component/example-shared-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
