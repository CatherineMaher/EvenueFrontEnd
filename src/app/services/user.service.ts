import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url="http://localhost:7005/users";
  constructor(private http:HttpClient,private _Router:Router){
    if(localStorage.getItem('token') !=null){
      this.saveCurrentUser();
    }
  }
  /////////////////////////////////////

  _isLoggedIn = false;
  isLoggedInChanged = new EventEmitter<boolean>();
  get isLoggedIn() {
    return this._isLoggedIn;
  }
  log(){
    this._isLoggedIn = true;
    // this.currentUser.next(true);
    this.isLoggedInChanged.emit( this._isLoggedIn);
    console.log("log function",this._isLoggedIn);
  }
  ///////////////////////////////////////////

addUser(data:any){
  return(this.http.post(this.url+"/add",data))
}

sendUser(data:any):Observable<any>{
  return this.http.post('http://localhost:7005/users/login',data)
}
saveCurrentUser(){
  console.log("in save cuurent user",this._isLoggedIn);
  let token:any=localStorage.getItem('token') ;
  let decodedToken: any = jwtDecode(token);
  localStorage.setItem('userRole', decodedToken.role);
  console.log("roleeeeeeeeeeeeeee",localStorage.getItem("userRole"))
  localStorage.setItem('userId', decodedToken.userId);
  }
logOut(){
  this._isLoggedIn = false;
  this.isLoggedInChanged.emit(this._isLoggedIn);
  localStorage.clear();
this._Router.navigate(['/login']);
}
getImageUrl(filename: any):string {
  return `http://localhost:7005/uploads/${filename}`;
}
getOneUser(id: any): Observable<any> {
  return this.http.get(`http://localhost:7005/users/${id}`)
}
}