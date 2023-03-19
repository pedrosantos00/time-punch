import { Component, OnInit } from '@angular/core';
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
  constructor(private auth : AuthService , private api: ApiService, private userCompany : UserStoreService){

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
  }

  logout(){
    this.auth.signOut();
  }
}
