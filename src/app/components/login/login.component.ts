import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import { GoogleAPIComponent } from '../google-api/google-api.component';

const authToken = localStorage.getItem('authToken');
const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

@Component({
    selector: 'app-login',
    standalone: true,
    providers: [UserService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, GoogleAPIComponent]
})
export class LoginComponent implements OnInit {
success = false;
failure = false;
 constructor( private usrsrv: UserService,private router: Router,private cdr: ChangeDetectorRef){

 }
imgpath="";
imgsrc="";
//  constructor( private usrsrv: UserService,private router: Router){}
  ngOnInit(): void {
    this.usrsrv.getuser().subscribe({
      next:(res:any)=>{this.imgpath = res.data.image
      console.log("imgpath",this.imgpath);
      }


    })
  }

 emailErrorMessage:string='';
   loginForm: FormGroup = new FormGroup({
     email: new FormControl(null,[Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}')]),
     password: new FormControl(null,[Validators.required,
       ]),
   });
 //Validators.pattern("^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$")
  DisplayImage(){
   this.imgsrc= this.usrsrv.getImageUrl(this.imgpath)
   console.log(this.imgsrc);

  }
  Login(submitData: FormGroup) {
    this.success = false;
    this.failure = false;
    // Call a method in the UserService to check if the user exists
    this.usrsrv.sendUser(submitData.value).subscribe({
      next:(user)=>{
        console.log("user",user);
        if (user.message=="success") {
          localStorage.setItem('token',user.token);
          this.usrsrv.saveCurrentUser();
          this.usrsrv.log();
          this.success = true;
          if(localStorage.getItem('userRole')=='user'){
            this.router.navigate(['/home']);
          }
          else if(localStorage.getItem('userRole')=='admin'){
            this.router.navigate(['adminHome']); // Replace with your desired route
          }
        } else {
          console.log('User does not exist');

          // Handle the case where the user does not exist
        }
      }
    }
    );
  }



}
