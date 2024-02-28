import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import { GoogleAPIComponent } from '../google-api/google-api.component';

const authToken = localStorage.getItem('authToken');
const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,GoogleAPIComponent],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
success = false;
failure = false;

 constructor( private usrsrv: UserService,private router: Router){}
 
 emailErrorMessage:string='';
   loginForm: FormGroup = new FormGroup({
     email: new FormControl(null,[Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}')]),
     password: new FormControl(null,[Validators.required,
       ]),
   });
 //Validators.pattern("^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$")
 
  Login(submitData: FormGroup) {
    const email = submitData.value.email;
    const password = submitData.value.password;
    this.success = false;
    this.failure = false;

    // Call a method in the UserService to check if the user exists
    this.usrsrv.checkCredentials(email, password).subscribe(
      (user) => {
        if (user && user.token) {
          console.log('User exists:', user);

          // Decode the JWT token
          const decodedToken: any = jwtDecode(user.token);
          console.log(decodedToken);
          // Store the decoded data in localStorage
          localStorage.setItem('authToken', user.token);
          localStorage.setItem('userId', decodedToken.userId);
          localStorage.setItem('userRole', decodedToken.role);

          this.success = true;
          // Navigate to the next page or perform other actions
          this.router.navigate(['/home']); // Replace with your desired route
        } else {
          console.log('User does not exist');

          // Handle the case where the user does not exist
        }
      },
      (error) => {
        this.failure = true;
        console.error('Error checking user:', error);
        // Handle the error as needed
      }
    );
  }
    
  
   
}
