import { Component, OnInit } from '@angular/core';
import { CartInfo } from '../../interface/cart-info';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit{
  cartInfo: any ;
  constructor( private cartsrv: CartService){
  }
  ngOnInit(): void {
    this.cartsrv.getCartInfo().subscribe({
      next: (cart: any) => {
        console.log(cart.data[0].events);
        this.cartInfo = cart.data[0];
      },
      error: (error) => {
        console.error('Error fetching cart information:', error);
      }
    });
  
  }


  //  ticket: CartInfo={
  //   eventId:'234567sgauiuhos',
  //   tickets: [
  //     {
  //       name: 'Ticket Type A',
  //       details: [
  //         { type: 'Regular', quantity: 10 },
  //         { type: 'VIP', quantity: 5 },
  //       ],
  //     },
  //     {
  //       name: 'Ticket Type B',
  //       details: [
  //         { type: 'General', quantity: 20 },
  //         { type: 'Premium', quantity: 15 },
  //       ],
  //     },
  //     // Add more tickets as needed
  //   ],
  // }

  // selectedTickets$ = this.ticketService.selectedTickets$;

  // constructor(private ticketService: TicketService) {}
}
