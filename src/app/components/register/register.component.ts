import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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

 constructor( private usrsrv: UserService,private router: Router){}
emailErrorMessage:string='';
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email: new FormControl(null,[Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}')]),
    password: new FormControl(null,[Validators.required,
      ]),
      role:  new FormControl("user")
  });
//Validators.pattern("^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$")

  Register(submitData:FormGroup) {
        this.usrsrv.addUser(submitData.value).subscribe({
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
