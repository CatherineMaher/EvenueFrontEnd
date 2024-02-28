import { CanActivateFn } from '@angular/router';

export const adminProtectGuard: CanActivateFn = (route, state) => {
  console.log(localStorage.getItem('userRole'));
  if(localStorage.getItem('userRole')=='admin'){
    return true
  }
  else{
    return false;
  }
};
