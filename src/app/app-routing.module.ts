import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { ProductsComponent } from '../app/pages/products/products.component';
import { ProductComponent } from '../app/pages/product/product.component';
import { SearchComponent } from '../app/pages/search/search.component';
import { Error404Component } from '../app/pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
	
	{path: '' , component: HomeComponent },
	{path: 'products/:param' , component: ProductsComponent },
	{path: 'product/:param' , component: ProductComponent },
	{path: 'search/:param' , component: SearchComponent },
	{path:  'login' , component: LoginComponent },
	{path:  'register' , component: RegisterComponent },
	{path:  'account' , component: AccountComponent, canActivate: [ AuthGuard ]},
	{path: '**' , pathMatch:'full', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
