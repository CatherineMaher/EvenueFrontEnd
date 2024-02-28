import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../../interface/event';
import { CommonModule } from '@angular/common';
import { count } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../searchPipe/search.pipe';
import { SearchByPricePipe } from '../searchPipe/searchByPrice/search-by-price.pipe';
import { SearchLocationPipe } from '../searchPipe/searchByLocation/search-location.pipe';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe, SearchByPricePipe, SearchLocationPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  events: Event[] = [];
  min: any[] = [];
  name: string = ''
  location: string = '';
  price: string = '';

  constructor(private router: Router, private EventModel:EventService) { }

  regSearch() {
    this.EventModel.getEventByname(this.name).subscribe({
      next: (res: any) => {
        if (res.message == "success" && res.data) {
          console.log(res);
          console.log(res._id);


        }
      }
    })
  }
  Viewmore(id: string) {
    // console.log("viewmore", id);
    this.router.navigate([`/details/${id}`])
  }


  ngOnInit(): void {
    this.EventModel.getEvents().subscribe({
      next: (res: any) => {
        if (res.message == "success" && res.data) {
          console.log(res.data);
          console.log("res.data[0]._id", res.data[0]._id);


          this.events = res.data;
          this.events.forEach(event => {
            let counter = 0;
            console.log(event.tickets?.[counter]?.totalTickets);
            console.log(counter);


            // Check if event.dates is defined and not an empty array
            // if (event.dates && event.dates.length > 0 && event.tickets?.[counter]?.totalTickets && event.tickets?.[counter]?.totalTickets != 0) {
            if (event.dates && event.dates.length > 0) {
              let mindate = event.dates[0].date;

              event.dates.forEach(dat => {
                // Check if dat.date is defined
                if (dat.date) {
                  console.log(dat.date);

                  // Check if dat.date is smaller than mindate
                  if (mindate && dat.date < mindate) {
                    mindate = dat.date;
                  }

                }
              });
              this.min.push(mindate);
              console.log(this.min);

              // Now mindate should be the minimum date in the event.dates array
              console.log('Minimum Date:', mindate);
              // if (counter < event.tickets.length) {
              //   counter++;
              // }
            }
          });
        } else {
          console.log("Can't fetch API or data is undefined");
        }
      },
    })
  }





}
