import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromCompany(){
    return this.role$.asObservable();
  }

  public setRoleForCompany(role:string){
    this.role$.next(role);
  }


  public getFullNameFromCompany(){
    return this.fullName$.asObservable();
  }

  public setFullNameForCompany(fullname:string){
    this.fullName$.next(fullname);
  }

}
