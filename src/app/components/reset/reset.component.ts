import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {


  type : string ="password"
  istText : boolean = false;
  eyeIcon : string = "fa-eye-slash"
  loginForm!: FormGroup;

  constructor(private fb:FormBuilder){

  }
  ngOnInit(): void
{
  this.loginForm = this.fb.group({
    password: ['', Validators.required],
    repeatPassword: ['',Validators.required]
  })
}



  hideShowPass()
  {
    this.istText = !this.istText;
    this.istText ? this.eyeIcon = "fa-eye" : this.eyeIcon ="fa-eye-slash";
    this.istText ? this.type = "text" : this.type ="password";

  }


}
