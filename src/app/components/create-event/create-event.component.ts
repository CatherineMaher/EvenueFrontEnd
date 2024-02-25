import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEventService } from '../../services/create-event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit {
  emailErrorMessage:string='';
  @ViewChild("link")
  link ?:ElementRef;
  @ViewChild("inst")
  inst ?:ElementRef;
  @ViewChild("totalTickets")
  totalTickets?:ElementRef;
  @ViewChild("price")
  price?:ElementRef;
  @ViewChild("reservedTicket")
  reservedTicket?:ElementRef;
  @ViewChild("ticketType")
  ticketType?:ElementRef;
  tickets?: {
    type?: string;
    totalTickets?:number;
    reserved?:number;
    price?:number;
  }[]=[];
  showTicketInfo: boolean = false;
  type:string[]=['Regular', 'VIP','Gold'];
  @ViewChild("start")
  start ?:ElementRef;
  @ViewChild("end")
  end ?:ElementRef;
  @ViewChild("date")
  date ?:ElementRef;
  eventTime?: {
    date?: string;
    times?: { start?: number; end?: number }[];
  }[]=[];
timeRange: { start?: number; end?: number }[] = [];
  user:any;
  facilities:string[]=[];
  instructions:string[]=[];
  registerForm!: FormGroup;

  // eventTime?:{hour?:Number,minute?:Number}[]=[];
  // registerForm: FormGroup = new FormGroup({
  //   title: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  //   location: new FormControl(null,[Validators.required,Validators.min(16),Validators.max(60)]),
  //   organizer: new FormControl(null,[Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]),
  //   Description: new FormControl(null,[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
  //   facilities: new FormControl(null,[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
  //   instructions: new FormControl(null,[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),

  // });
  submitForm(data:any){
    console.log("eventtime",this.eventTime);
    console.log("tickets",this.tickets);
    console.log("fac",this.facilities);
    console.log("inst",this.instructions);
    data.controls.dates.setValue(this.eventTime)
    data.controls.tickets.setValue(this.tickets);
    data.controls.facilities.setValue(this.facilities);
    data.controls.instructions.setValue(this.instructions);


    console.log(data.value);
    this._CreateEventService.addEvent(data.value).subscribe({
      next:(res:any)=>{
        console.log("result from api",res);

        if(res.message=='success'){
          console.log('success');

          // this._Router.navigate(['/events']);
        }
        else{
          this.emailErrorMessage=res.message;

        }
      }
    })
  }

  constructor(private _Router:Router,private _CreateEventService:CreateEventService) {}

  ngOnInit(): void {

    this.registerForm= new FormGroup({
      title: new FormControl(null,[Validators.required]),
      location: new FormControl(null,[Validators.required]),
      organizer: new FormControl(null,[Validators.required]),
      Description: new FormControl(null,[Validators.required]),
      facilities:new FormControl([]),
      instructions:new FormControl([]),
      dates:new FormControl([]),
      tickets:new FormControl([]),
    });
  }
  AddFacility(){
    let link='';
    link= this.link?.nativeElement.value
    console.log(link);
    this.facilities?.push(link);
    console.log("profile links",this.facilities)
  }
  removeFacility(index:number){
    this.facilities.splice(index,1);
    // console.log(this.user.facilities);
  }
  AddInstruction(){
    let inst='';
    inst= this.inst?.nativeElement.value
    console.log(inst);
    this.instructions?.push(inst);
    console.log("instructions",this.instructions)
  }
  removeInstruction(index:number){
    this.instructions.splice(index,1);
    // console.log(this.user.instructions);
  }
  remove(index:number){
    // this.user.time_range.splice(index,1);
    // this.user.time_range.splice(index,1);
    // console.log(this.user.time_range);
  }
  removeTimeRange(index:number){
    this.timeRange.splice(index,1);
  }
  removeEvent(index:number){
    this.eventTime?.splice(index,1);
  }
  removeTicket(index:number){
    this.tickets?.splice(index,1);
  }
  addTimeRange() {
    const startValue = this.start?.nativeElement.value;
    const endValue = this.end?.nativeElement.value;
    if (startValue && endValue) {
      this.timeRange.push({ start: startValue, end: endValue });
      if (this.start && this.start.nativeElement && this.end && this.end.nativeElement) {
        this.start.nativeElement.value = '';
        this.end.nativeElement.value = '';
      } else {
        console.error("Cannot access start or end elements.");
      }
    } else {
      console.error("Please fill in start and end time.");
    }
  }
  AddTicket(){
    console.log(this.price?.nativeElement.value)
    console.log(this.reservedTicket?.nativeElement.value)
    console.log(this.totalTickets?.nativeElement.value)
    console.log(this.ticketType?.nativeElement.value)
    const price= this.price?.nativeElement.value
    const totalTickets= this.totalTickets?.nativeElement.value
    const reservedTicket= this.reservedTicket?.nativeElement.value
    const ticketType= this.ticketType?.nativeElement.value

    this.tickets?.push({type:ticketType,price:price,totalTickets:totalTickets,reserved:reservedTicket});
    console.log("my tickets",this.tickets);
  }
  Add() {
    console.log(this.timeRange);
    var element:any;
    const dateValue = this.date?.nativeElement.value;
    const startValue = this.start?.nativeElement.value;
    const endValue = this.end?.nativeElement.value;
    if (dateValue &&( startValue && endValue)||this.timeRange.length!=0) {
      if(!startValue&&!endValue&&this.timeRange.length!=0){
         element = {
          date: dateValue,
          times: [...this.timeRange]
        };
      }
      else if(startValue&&endValue&&this.timeRange.length!=0){
        this.timeRange.push({start:startValue,end:endValue});
        element = {
          date: dateValue,
          times: [...this.timeRange]
        };
      }
      else if(startValue&&endValue&&this.timeRange.length==0){
         element = {
          date: dateValue,
          times: [{
            start: startValue,
            end: endValue
          }]
        };
      }
      console.log(element);
      this.eventTime?.push(element);
      console.log("timeeeeeeeeeeeeeeeee",this.eventTime);
      this.timeRange=[];
    } else {
      console.error("Please fill in all fields.");
    }
  }

toggleTicketInfo() {
  this.showTicketInfo = !!this.ticketType?.nativeElement.value; // Check if any option is selected
}
}
