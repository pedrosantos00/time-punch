import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import {  NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/services/user-store.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

type : string ="password"
istText : boolean = false;
eyeIcon : string = "fa-eye-slash"
loginForm!: FormGroup;

public resetPasswordEmail!: string;
public isValidEmail!: boolean;


constructor(
  private fb:FormBuilder,
   private auth : AuthService,
   private router : Router ,
   private toast: NgToastService,
   private userCompany : UserStoreService,
   private resetService : ResetPasswordService
   )
{

}

ngOnInit(): void
{
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['',Validators.required]
  })
}
  hideShowPass()
  {
    this.istText = !this.istText;
    this.istText ? this.eyeIcon = "fa-eye" : this.eyeIcon ="fa-eye-slash";
    this.istText ? this.type = "text" : this.type ="password";

  }

  onLogin()
  {
    if(this.loginForm.valid)
      {
        console.log(this.loginForm.value)

        this.auth.login(this.loginForm.value)
        .subscribe({
            next: (res) =>{
            console.log(res.message);
            this.loginForm.reset();
            this.auth.storeToken(res.acessToken);
            this.auth.storeRefreshToken(res.refreshToken);
            const tokenPayload = this.auth.decodedToken();
            this.userCompany.setFullNameForCompany(tokenPayload.unique_name);
            this.userCompany.setRoleForCompany(tokenPayload.role);
            this.toast.success({detail:"SUCCESS",summary:res.message, duration:5000});
            this.router.navigate(['dashboard']);
          },
            error:(err)=>{
              console.log(err);
              this.toast.error({detail:"ERROR",summary:err?.message, duration:5000});
            }
          })
      }
    else
      {
        this.validateAllFormFields(this.loginForm);
        this.toast.error({detail:"ERROR",summary:"Fill all the required data", duration:5000});
      }
  }

  private validateAllFormFields(formGroup:FormGroup)
  {
    Object.keys(formGroup.controls).forEach(f =>{
      const control = formGroup.get(f);
      if(control instanceof FormControl)
      {
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup)
      {
        this.validateAllFormFields(control);
      }
    })
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);

          //API CALL
          this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
          .subscribe({
            next:(res) => {
              this.toast.success({detail:"SUCCESS",summary:res.message, duration:5000});
              this.resetPasswordEmail = "";
              const buttonRef = document.getElementById("closeBtn");
              buttonRef?.click();
            },
            error:(err) => {
              this.toast.error({detail:"ERROR",summary:err?.message, duration:5000});
            }
          })
    }
  }

}





