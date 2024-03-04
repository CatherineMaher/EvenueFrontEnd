import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 name="";
 email="";
 password="";
 role="user";
 success = false;
 failure = false;
 image: any;
 constructor( private usrsrv: UserService,private router: Router){}
emailErrorMessage:string='';
  registerForm: FormGroup = new FormGroup({
    image:new FormControl(null),
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email: new FormControl(null,[Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}')]),
    password: new FormControl(null,[Validators.required,
      ]),
      role:new FormControl("user")

  });

onImageFileSelected(event:any){
  this.image = event.target.files[0];

  
}
  Register(submitData:any) {
    const formData = new FormData();
    formData.append('image',this.image);
    formData.append('name', submitData.get('name').value);
    formData.append('email', submitData.get('email').value);
    formData.append('password', submitData.get('password').value);
    formData.append('role', submitData.get('role').value);
        this.usrsrv.addUser(formData).subscribe({
          next:(res:any)=>{
            console.log(res);
            if(res.message=='success'){
              this.success=true;
              console.log("success");
              this.router.navigate(['/login']);
            }
            else{
              this.failure=true;
              this.emailErrorMessage=res.message;
            }
          }
        })


  }
}
