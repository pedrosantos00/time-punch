import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private BaseUrl : string = "https://localhost:7192/User/";
  constructor(private http:HttpClient) { }


  sendResetPasswordLink(email:string){
    return this.http.post<any>(`${this.BaseUrl}send-reset-email/${email}`, {});
  }

  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.BaseUrl}reset-password`, resetPasswordObj);
  }
}
