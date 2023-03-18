import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import {  NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/services/auth.service';

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

constructor(
  private fb:FormBuilder,
   private auth : AuthService,
   private router : Router ,
   private toast: NgToastService)
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
        this.auth.login(this.loginForm.value)
        .subscribe({
            next:(res=>{
            this.loginForm.reset();
            this.auth.storeToken(res.token);
            this.toast.success({detail:"SUCCESS",summary:res.message, duration:5000});
            this.router.navigate(['dashboard']);
          })
            ,error:(err=>{
              this.toast.error({detail:"ERROR",summary:err?.error.message, duration:5000});
            })
          })
      }
    else
      {
        this.validateAllFormFields(this.loginForm);
        console.log("Form is not valid");
        alert("form invalid")
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
}


