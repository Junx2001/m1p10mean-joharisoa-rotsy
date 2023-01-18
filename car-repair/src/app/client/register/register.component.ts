import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/global/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm! : FormGroup;
  constructor(private formBuilder : FormBuilder,
    private authService : AuthService) { }
    successMessage : boolean = false;
    errorMessage : boolean = false;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name : [null, Validators.required],
      email : [null, Validators.required],
      password : [null, Validators.required]
    })
  }
  onSubmitRegisterForm(){
    this.authService.registerUser(this.registerForm.value).subscribe(
      (response) =>{ 
        console.log("response received");
        this.successMessage = true;
      },
      (error)=>{
        console.error('request failed with error');
        if (error.status === 409){
          this.errorMessage = true;
        }
      }
    )
  }

}
