import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   /**
    *   path?:String;
  constructor(private router: Router,private _ActivatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.path=this._ActivatedRoute.snapshot.url[0].path;
    console.log("snapshot",this._ActivatedRoute.snapshot.url[0].path);
  }
    */
  constructor(private _UserService:UserService,private _Router:Router,private _ActivatedRoute:ActivatedRoute){}
  isAdmin:any=false;
  isHomeRoute: boolean = false;
  path:any;
  loggedIn:boolean=false;
  ngOnInit(): void {
    this.path=this._ActivatedRoute.snapshot;
    console.log(this.path);
    this._Router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isHomeRoute = event.url === '/home';
        console.log("ss",this.isHomeRoute);

      }
    });
    this._UserService.isLoggedInChanged.subscribe(
      isLoggedIn=>{
        if(isLoggedIn){
          this.loggedIn=true;
        }
        else{
          this.loggedIn=false;
        }
      })
    console.log(this.isAdmin);
    if(localStorage.getItem('userRole')!=null){
      this._UserService.log();
    }

  }
logOut(){
  this._UserService.logOut();
}
logIn(){
  this._Router.navigate(['/login']);
}
}
