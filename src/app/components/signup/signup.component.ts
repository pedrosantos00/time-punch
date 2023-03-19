import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  type : string ="password"
  istText : boolean = false;
  eyeIcon : string = "fa-eye-slash"
  signupForm!: FormGroup;

  constructor(
    private fb:FormBuilder ,
     private auth: AuthService ,
      private router: Router,
      private toast: NgToastService)
  {

  }
  ngOnInit(): void{
    this.signupForm = this.fb.group({
      companyName : ['', Validators.required],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
  }
    hideShowPass(){
      this.istText = !this.istText;
      this.istText ? this.eyeIcon = "fa-eye" : this.eyeIcon ="fa-eye-slash";
      this.istText ? this.type = "text" : this.type ="password";

    }
    onRegister()
    {
      if(this.signupForm.valid)
        {
          this.auth.signUp(this.signupForm.value)
          .subscribe({
            next:(res)=>{
              this.toast.success({detail:"SUCCESS",summary:res.message, duration:5000})
            this.router.navigate(['login']);
          },
          error:(err)=>{
            console.log(err);
            this.toast.error({detail:"ERROR",summary:err?.message, duration:5000});
            }
          })
        }
      else
        {
          this.validateAllFormFields(this.signupForm);
          console.log("Form is not valid");
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
