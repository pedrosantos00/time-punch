import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public users: any = [];
  public fullName : string = "";
  public role : string = "";
  constructor(private auth : AuthService , private api: ApiService, private userCompany : UserStoreService, private toast: NgToastService){

  }



  ngOnInit(): void
  {
    this.api.getUsers()
    .subscribe(res =>{
      this.users = res;
    });


    this.userCompany.getFullNameFromCompany()
    .subscribe(val =>{
      let FullnameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || FullnameFromToken
    })

    this.userCompany.getRoleFromCompany()
    .subscribe(val =>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    })
  }

  logout(){
    this.auth.signOut();
    this.toast.success({detail:"Logout",summary:"Logout Success!", duration:5000});
  }
}
