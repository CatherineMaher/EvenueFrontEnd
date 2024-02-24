import { Routes } from '@angular/router';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { PaymentComponent } from './components/payment/payment/payment.component';

export const routes: Routes = [
  { path: 'checkout/payment', component: PaymentComponent },
  { path: 'details', component: EventDetailsComponent },
];
