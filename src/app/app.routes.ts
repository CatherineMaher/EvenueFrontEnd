import { Routes } from '@angular/router';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { LoginComponent } from './components/login/login.component';
import { protectGuard } from './guard/protect.guard';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { adminProtectGuard } from './guard/admin-protect.guard';
import { AllReservationsComponent } from './components/all-reservations/all-reservations.component';
import { GoogleAPIComponent } from './components/google-api/google-api.component';
import { AboutComponentComponent } from './components/about-component/about-component.component';
export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'events',component: SearchComponent },
  { path: 'checkout/payment', component: PaymentComponent },
  { path: 'details/:id', component: EventDetailsComponent },
  // { path: 'details',component: EventDetailsComponent },
  { path: 'home' ,component: HomeComponent },
  { path: 'adminHome' ,canActivate:[adminProtectGuard],component: AdminHomeComponent },
  { path: 'reservations' ,canActivate:[adminProtectGuard],component: AllReservationsComponent },
  {path:'login',component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  {path:"addEvent",component:CreateEventComponent},
  {path:"about",component:AboutComponentComponent},
  // ,canActivate:[adminProtectGuard]
  { path: '', component: GoogleAPIComponent }
];
