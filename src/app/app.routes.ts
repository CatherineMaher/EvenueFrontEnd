import { Routes } from '@angular/router';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
export const routes: Routes = [
  { path: 'events', component: SearchComponent },
  { path: 'checkout/payment', component: PaymentComponent },
  { path: 'details/:id', component: EventDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
];
