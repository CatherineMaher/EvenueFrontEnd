import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../interfaces/reservation';

@Component({
  selector: 'app-all-reservations',
  standalone: true,
  imports: [],
  templateUrl: './all-reservations.component.html',
  styleUrl: './all-reservations.component.css'
})
export class AllReservationsComponent implements OnInit{
  id:any;
  allReservations:Reservation[]=[];
 
  constructor(private _AdminService:AdminServiceService,private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    // this.id=this._ActivatedRoute.snapshot.params['id'];
this._AdminService.getAllReservations().subscribe({
  next:(res)=>{
    if(res.message=="success"){
      this.allReservations=res.data;

console.log("reservation",this.allReservations);


    }
  }
});
  }
  regNavigate(){}

}
