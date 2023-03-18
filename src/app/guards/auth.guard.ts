import { Injectable } from '@angular/core';
import { CanActivate, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/services/auth.service';
import {  NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private auth : AuthService, private router : Router, private toast: NgToastService) {
}

  canActivate(){
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.toast.error({detail:"Information",summary:'Please Login First', duration:5000});
      this.router.navigate(['login']);
      return false;
    }
  }

}
