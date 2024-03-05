import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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
export class LoginComponent {
success = false;
failure = false;
 constructor( private usrsrv: UserService,private router: Router,private cdr: ChangeDetectorRef){

 }
 emailErrorMessage:string='';
   loginForm: FormGroup = new FormGroup({
     email: new FormControl(null,[Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}')]),
     password: new FormControl(null,[Validators.required,
       ]),
   });
 //Validators.pattern("^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$")
  Login(submitData: FormGroup) {
    this.success = false;
    this.failure = false;
    // Call a method in the UserService to check if the user exists
    this.usrsrv.sendUser(submitData.value).subscribe({
      next:(user)=>{
        console.log("user",user);
        if (user.message=="success") {
          localStorage.setItem('token',user.token);
          this.success = true;
          console.log(localStorage.getItem('userRole'));
          if(localStorage.getItem('userRole')=='user'){
            console.log("userrrrrr");
            this.router.navigate(['/home']);
          }
          else if(localStorage.getItem('userRole')=='admin'){
            this.router.navigate(['/adminHome']); // Replace with your desired route
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
