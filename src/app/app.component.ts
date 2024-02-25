import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './components/searchPipe/search.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    HttpClientModule,
    CommonModule,
    SearchPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'evenue';
}
