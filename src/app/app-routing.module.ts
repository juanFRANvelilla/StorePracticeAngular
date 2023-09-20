import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'stores', loadChildren: () => import('./pages/stores/stores.module').then(m => m.StoresModule) },
  { path: 'example', loadChildren: () => import('./pages/example/example.module').then(m => m.ExampleModule) },
  {path: '**', redirectTo: '/products',pathMatch:'full'},
  {path: '', redirectTo: '/products',pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
