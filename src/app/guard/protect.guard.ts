import { CanActivateFn } from '@angular/router';

export const protectGuard: CanActivateFn = (route, state) => {
  console.log(localStorage.getItem('isAdmin'));
  if(localStorage.getItem('isAdmin')=='admin'){
    return true
  }
  else{
    return false;
  }

};
