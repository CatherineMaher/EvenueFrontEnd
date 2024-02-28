import { CanActivateFn } from '@angular/router';

export const protectGuard: CanActivateFn = (route, state) => {
  console.log(localStorage.getItem('userRole'));
  if(localStorage.getItem('userRole')=='user'){
    return true
  }
  else{
    return false;
  }

};
