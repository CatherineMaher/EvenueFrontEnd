import { UserService } from './../../services/user.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private _UserService: UserService, private _Router: Router) {}
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
  isHomeRoute: boolean = false;
  path: any;
  hasaphoto: boolean = false;
  imageUrl?: string;
  imageName?: string;
  userName?: string;
  loggedIn: boolean = false;
  private userSub?: Subscription;
  ngOnInit(): void {
    console.log('Navbar component initialized');
    this.loggedIn = !!UserService.getUser();
    this.userSub = UserService.user.subscribe((user) => {
      // console.log('User subscription triggered:', user);
      console.log('sub scr btionnnnnnn!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

      this.loggedIn = !!user;
      this.showPhoto();
      if (localStorage.getItem('userId') != null) {
        this._UserService.getOneUser(localStorage.getItem('userId')).subscribe({
          next: (res) => {
            if (res.message == 'success') {
              console.log('user log in', res.data);
              this.imageName = res.data.image;
              this.userName = res.data.name;
              this.showPhoto();
            }
          },
        });
      }
    });

    this._Router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isHomeRoute = event.url === '/home';
      }
    });
  }
  logOut() {
    this._UserService.logOut();
    this.hasaphoto = false;
    this.imageName = undefined; // Reset image name
    this.userName = undefined; // Reset user name
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
