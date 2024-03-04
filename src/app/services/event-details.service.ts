import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventDetailsService {
  reservationDetails: any = [];

  flag = false;

  getReservationDetails() {
    return this.reservationDetails;
  }

  constructor(private httpClient: HttpClient) {}

  addReservation(reservation: any) {
    this.reservationDetails.push(reservation);
  }

  getEventDetails(id: string) {
    return this.httpClient.get(`http://localhost:7005/events/${id}`);
  }
}
