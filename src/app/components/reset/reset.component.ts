import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetForm!: FormGroup;
  emailToReset! : string;
  emailToken! : string;
  type : string ="password"
  istText : boolean = false;
  eyeIcon : string = "fa-eye-slash";
  resetPasswordObj = new ResetPassword();

  constructor(
      private fb:FormBuilder,
      private activatedRoute : ActivatedRoute,
      private resetService : ResetPasswordService,
      private toast: NgToastService ,
      private router : Router){

  }


  ngOnInit(): void
{
  this.resetForm = this.fb.group({
    password: [null, Validators.required],
    repeatPassword: [null, Validators.required]
  },{
    validator: ConfirmPasswordValidator("password","repeatPassword"),
  });

this.activatedRoute.queryParams.subscribe(val =>{
  this.emailToReset = val['email'];
  let urlToken = val['code'];
  this.emailToken = urlToken.replace(/ /g,'+');
  console.log(this.emailToken)
})
}


  hideShowPass()
  {
    this.istText = !this.istText;
    this.istText ? this.eyeIcon = "fa-eye" : this.eyeIcon ="fa-eye-slash";
    this.istText ? this.type = "text" : this.type ="password";
  }


  reset(){
    if(this.resetForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetForm.value.password;
      this.resetPasswordObj.confirmPassword =  this.resetForm.value.repeatPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
          next:(res)=>{
            this.toast.success({detail:"SUCCESS",summary:res.message, duration:5000});
          this.router.navigate(['login']);
        },
        error:(err)=>{
          console.log(err);
          this.toast.error({detail:"ERROR",summary:err?.message, duration:5000});
          }
        })

      }else{

      }
  }

}
