import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Event } from '../../interface/event';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    RouterModule,
    // BrowserAnimationsModule,
    CarouselModule,
    CommonModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  Events: Event[]=[];
  imageName: any;
  imageUrl?: string;
  isHovered: { [key: string]: boolean } = {};
  constructor(private _EventService:EventService,private _Router:Router ){}
  ngOnInit(): void {
    this._EventService.getEvents().subscribe({
      next: (res: any) => {
        if (res.message == "success" && res.data) {
          this.Events = res.data;
          let lengthOfEvent = this.Events.length;
        // this.Events=  this.Events.slice(0,10);
        this.Events=  this.Events.slice(0,lengthOfEvent);
          console.log(this.Events);

          this.Events.forEach(event => {
            // let counter = 0;
            // console.log(event.tickets?.[counter]?.totalTickets);
            // console.log(counter);
            if(event.image){
              this.imageName=event?.image;
              this.imageUrl=this._EventService.getImageUrl(this.imageName);
              event.image=this.imageUrl;
              console.log("event.image",event.image);
            }
          })


        } else {
          console.log("Can't fetch API or data is undefined");
        }
      },
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  navigateEventDetails(id:string){
    this._Router.navigate([`/details/${id}`])
  }
}
