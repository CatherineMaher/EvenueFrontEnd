import { Component, OnInit } from '@angular/core';
import { EventDetailsService } from '../../services/event-details.service';
import { MyEvent } from '../../interfaces/my-event';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
})
export class EventDetailsComponent implements OnInit {
  myEvent: any;
  selectedDate: any;
  ticketsInfo: any;

  title: string = '';
  description: string = '';
  location: string = '';
  dates: any;
  facilities: string[] = [];
  organizer: string = '';
  instructions: string[] = [];

  firstDate = {};

  regularTicket: number = 0;
  goldTicket: number = 0;
  vipTicket: number = 0;

  ID = '0';
  constructor(
    private detailsService: EventDetailsService,
    private myActivate: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ID = this.myActivate.snapshot.params['_id'];
    this.detailsService.getEventDetails('65dd0809b5df4a0c2cc3faa1').subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.myEvent = data.data;
        this.title = this.myEvent.title;
        this.description = this.myEvent.Description;
        this.location = this.myEvent.location;
        this.dates = this.myEvent.dates;

        this.firstDate = this.dates[0].date;
        this.facilities = this.myEvent.facilities;
        this.organizer = this.myEvent.organizer;
        this.instructions = this.myEvent.instructions;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addRegular() {
    this.regularTicket++;
  }

  minusRegular() {
    if (this.regularTicket > 0) {
      this.regularTicket--;
    }
  }

  addGold() {
    this.goldTicket++;
  }

  minusGold() {
    if (this.goldTicket > 0) {
      this.goldTicket--;
    }
  }

  addVip() {
    this.vipTicket++;
  }

  minusVip() {
    if (this.vipTicket > 0) {
      this.vipTicket--;
    }
  }

  buyTickets() {
    this.ticketsInfo = {
      eventID: this.ID,
      regular: this.regularTicket,
      gold: this.goldTicket,
      vip: this.vipTicket,
      date: this.selectedDate,
    };

    console.log(this.ticketsInfo);
    console.log('Regular: ' + this.regularTicket);
    console.log('Gold: ' + this.goldTicket);
    console.log('VIP: ' + this.vipTicket);
    console.log(
      'Date: ' +
        this.selectedDate.date +
        ' ' +
        this.selectedDate.start +
        ' - ' +
        this.selectedDate.end
    );
  }
}
