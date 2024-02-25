import { Component } from '@angular/core';
import { PaymentSuccessComponent } from '../payment-success/payment-success.component';
import { PaymentFailComponent } from '../payment-fail/payment-fail.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PaymentSuccessComponent, PaymentFailComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  isPayed: boolean = false;
  isSuccess: boolean = false;
  isFail: boolean = false;

  processPayment() {
    throw new Error('Method not implemented.');
  }
}
