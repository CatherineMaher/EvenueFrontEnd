import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url="http://localhost:7005/users";

  constructor(private http:HttpClient,private _Router:Router){}
  /////////////////////////////////////
  currentUser=new BehaviorSubject(null);//notlogin
  _isLoggedIn = false;
  isLoggedInChanged = new EventEmitter<boolean>();
  get isLoggedIn() {
    return this._isLoggedIn;
  }
  log(){
    this._isLoggedIn = true;
    this.isLoggedInChanged.emit(this._isLoggedIn);
  }
  ///////////////////////////////////////////


addUser(data:any){
  return(this.http.post(this.url+"/add",data))
}
checkCredentials(email: string, password: string) {
  const data = { email, password };
  return this.http.post<{ success: boolean, token?: string }>(`${this.url}/login`, data);
}
saveCurrentUser(token:any){

  const decodedToken: any = jwtDecode(token);
  // console.log("decoded token",decodedToken);
  // Store the decoded data in localStorage
  // localStorage.setItem('authToken', token);
  localStorage.setItem('userId', decodedToken.userId);
  localStorage.setItem('userRole', decodedToken.role);
  }
logOut(){
  this._isLoggedIn = false;
  this.isLoggedInChanged.emit(this._isLoggedIn);
  localStorage.clear();
// this._Router.navigate(['/login']);
}

}
