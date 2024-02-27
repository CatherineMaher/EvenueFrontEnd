import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventDetailsService {
  constructor(private httpClient: HttpClient) {}

  getEventDetails(id: string) {
    return this.httpClient.get(`http://localhost:7005/events/${id}`);
  }
}
