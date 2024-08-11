import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/main/main.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { FeaturesDetailsComponent } from './layout/features-details/features-details.component';
import { LoginComponent } from './layout/login/login.component';
import { ColorChangerDirective } from './color-changer.directive';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './layout/products-list/products-list.component';
import { ProductPageComponent } from './layout/product-page/product-page.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { ConnectionService } from './services/connection.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { RecordService } from './services/record.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    FeaturesDetailsComponent,
    LoginComponent,
    ColorChangerDirective,
    ProductsListComponent,
    ProductPageComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ ConnectionService,UserService,ProductService,RecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
