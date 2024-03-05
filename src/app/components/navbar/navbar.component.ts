import { UserService } from '../../services/user.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private _UserService: UserService, private _Router: Router) {}
  isHomeRoute: boolean = false;
  path: any;
  hasaphoto: boolean = false;
  imageUrl?: string;
  imageName?: string;
  userName?: string;
  loggedIn: boolean = false;
  ngOnInit(): void {
    // if(localStorage.getItem('userRole')!=null){

    // }
    console.log('localStorage.getItem()', localStorage.getItem('userRole'));
    this._UserService.isLoggedInChanged.subscribe((isLoggedIn) => {
      console.log('in nav barr', this._UserService._isLoggedIn);
      if (isLoggedIn) {
        // this.hasaphoto=true;
        this.loggedIn = true;
        console.log('logged in ', this.loggedIn);
        // this.showPhoto();
      } else {
        this.loggedIn = false;
        console.log('logged in ', this.loggedIn);
      }
    });

    if (localStorage.getItem('userId') != null) {
      this._UserService.getOneUser(localStorage.getItem('userId')).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.imageName = res.data.image;
            this.hasaphoto = true;
            // console.log(this.imageName);
            this.userName = res.data.name;
            this.showPhoto();
          }
        },
      });
    }

    this._Router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isHomeRoute = event.url === '/home';
      }
    });
  }
  logOut() {
    this._UserService.logOut();
  }
  // displayUserInfo() {
  //   console.log("hereeeeeeeeeeeeeeeee");

  //   if (localStorage.getItem('token') != null) {
  //       this.showPhoto();
  //       this.hasaphoto=true;
  //       // this.loggedIn = true;
  //   }
  //   // } else {
  //   //   this.loggedIn = false;
  //   // }
  // }
  showPhoto() {
    console.log('in show photo', this.imageName);
    this.imageUrl = this._UserService.getImageUrl(this.imageName);
    this.hasaphoto = true;
    //  console.log(this.imageName);
    //  console.log("this image url",this.imageUrl);
  }
  openCart() {
    this._Router.navigate(['/cart']);
  }
}
