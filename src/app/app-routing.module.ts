import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { LoginComponent } from './layout/login/login.component';
import { ProductsListComponent } from './layout/products-list/products-list.component';
import { ProductPageComponent } from './layout/product-page/product-page.component';
import { authGuard } from './auth-guard.service';

const routes: Routes = [
  {path:"",pathMatch:"full",component:LandingPageComponent},
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:ProductsListComponent,canActivate:[authGuard]},
  {path:"product/:id",component:ProductPageComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
