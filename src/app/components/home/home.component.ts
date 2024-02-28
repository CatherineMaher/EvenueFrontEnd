import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  path?:String;
  constructor(private router: Router,private _ActivatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    // this.path=this._ActivatedRoute.snapshot.url[0].path;
    // console.log("snapshot",this._ActivatedRoute.snapshot.url[0].path);
  }



}
