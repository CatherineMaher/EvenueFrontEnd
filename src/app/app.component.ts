import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPipe } from './components/searchPipe/search.pipe';
import { SearchByPricePipe } from './components/searchPipe/searchByPrice/search-by-price.pipe';
import { SearchLocationPipe } from './components/searchPipe/searchByLocation/search-location.pipe';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    CartComponent,
    RouterModule,
    HttpClientModule,
    FooterComponent,
    EventDetailsComponent,
    SearchComponent,
    HttpClientModule,
    CommonModule,
    SearchPipe,
    SearchByPricePipe,
    SearchLocationPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'evenue';
}
