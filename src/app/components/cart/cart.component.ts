import { Component, OnInit } from '@angular/core';
import { CartInfo } from '../../interface/cart-info';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { EventDetailsService } from '../../services/event-details.service';
import { EventService } from '../../services/event.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit{
  cartInfo: any ;
  ticketsQ : any ;
  regular:any =0 ;
  gold:any =0;
  vip:any =0;
  sum:any = 0 ;
  totalQuantity:any=0;
  cartSum:any = 0;
  eventPrice:any = 0;
  cartPrice:any = 0;
  constructor( private evtsrv: EventService, private evdsrv : EventDetailsService ){
  }
  ngOnInit(): void {
   
    this.cartInfo=this.evdsrv.reservationDetails
    this.totalQuantity = this.cartInfo.length;
    this.eventPrice =this.totalEventPrice();
    
    // console.log(this.cartPrice);
    console.log("mariam",this.totalEventPrice());
  }
  totalEventPrice(){
    this.sum=0;
    this.cartInfo.forEach((event:any) => {
      event.tickets.forEach((ticket:any) => {
        this.sum+=ticket.price;
     });
     console.log("sum gowa for each el kbeera",this.sum);
    }
    )
    return this.sum
  }
  
  minus(index:any,type:any) {
   
      // this.ticketsQ--;
      this.cartInfo[index].tickets.forEach((ticket:any) => {
        console.log(ticket.type);
        if(ticket.type == type){
          
          ticket.quantity--;
          ticket.price=ticket.price - ticket.SingleTicketPrice;
          this.eventPrice =this.totalEventPrice();
          
        }
      })
  }
  add(index:any,type:any) {
    // this.ticketsQ++;
    this.cartInfo[index].tickets.forEach((ticket:any) => {
      console.log(ticket.type);
      if(ticket.type == type){
        
        ticket.quantity++;
        ticket.price=ticket.price + ticket.SingleTicketPrice;
        this.eventPrice =this.totalEventPrice();
        
      }
    })
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
