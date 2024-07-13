import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FeaturesDetailsComponent } from './features-details/features-details.component';
import { LoginComponent } from './login/login.component';
import { ColorChangerDirective } from './color-changer.directive';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    FeaturesDetailsComponent,
    LoginComponent,
    ColorChangerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
