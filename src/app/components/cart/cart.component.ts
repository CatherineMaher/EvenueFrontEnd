import { Component, OnInit } from '@angular/core';
import { CartInfo } from '../../interface/cart-info';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { EventDetailsService } from '../../services/event-details.service';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit{
  cartInfo: any ;
  ticketsQ : any = 5 ;
  regular:any =0 ;
  gold:any =0;
  vip:any =0;
  constructor( private evtsrv: EventService, private evdsrv : EventDetailsService ){
  }
  ngOnInit(): void {
    // this.evdsrv.getReservationDetails().subscribe({
    //   next: (cart: any) => {
    //     this.cartInfo = cart.data.find((reserve:any) => !reserve.isPurchased)
    //     // console.log(  this.cartInfo.events.ticketInfo);
    //     // this.cartInfo.events.ticketsInfo.forEach((ticket:any) => {
    //     // console.log(ticket.type==='regular');
    //     //   if(ticket.type==='regular'){
    //     //     this.regular=ticket.quantity;
    //     //   }
    //     //   else if(ticket.type==='gold'){
    //     //     this.gold=ticket.quantity;
    //     //   }
    //     //   else if (ticket.type==='vip'){
    //     //     this.vip=ticket.quantity;
    //     //   }
          
    //     // });
    //   },
    //   error: (error:any) => {
    //     console.error('Error fetching cart information:', error);
    //   }
    // });
    this.cartInfo=this.evdsrv.reservationDetails
    
  }
  
  minus() {
      this.ticketsQ--;
  }
  add() {
    this.ticketsQ++;
}
delete(evt:any){
 let cartItem = evt.target.closest(".cartItem");
  cartItem.remove();
  let cartItemId  = cartItem.id;
  console.log(cartItemId);

 console.log(this.cartInfo.events);

 let updatedcart = this.cartInfo.events.filter((event:any) => event._id!==cartItemId)
 console.log("updated cart", updatedcart);


//  this.cartsrv.updateCart(this.cartInfo._id, { events: updatedcart }).subscribe({
//   next: (updatedCart: any) => {
//       console.log('Cart updated successfully:', updatedCart);
//       // You can update your local cartInfo here if needed
//       this.cartInfo = updatedCart;
//   },
//   error: (error) => {
//       console.error('Error updating cart:', error);
//   }
// });




//  this.cartsrv.updateCart(this.cartInfo._id,{events:updatedcart});


//  this.cartsrv.getCartInfo().subscribe({
//   next: (cart: any) => {
//     console.log(cart);
//   },
//   error: (error) => {
//     console.error('Error fetching cart information:', error);
//   }
// });

}
}
