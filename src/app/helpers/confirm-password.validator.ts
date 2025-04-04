import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator(controlName : string, matchControlName:string){
return (formGroup : FormGroup) =>{
    const passwordControl = formGroup.controls[controlName];
    const confirmPasswordControl = formGroup.controls[matchControlName];


      if(confirmPasswordControl.errors && confirmPasswordControl.errors['ConfirmPasswordValidator']){
      return;
      }


      if(passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({ConfirmPasswordValidator:true })
      } else{
        confirmPasswordControl.setErrors(null);
      }
  }
}
