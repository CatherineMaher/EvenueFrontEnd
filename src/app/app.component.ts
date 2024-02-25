import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
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
    EventDetailsComponent,
    SearchComponent,
    HttpClientModule,
    CommonModule,
    SearchPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'evenue';
}
