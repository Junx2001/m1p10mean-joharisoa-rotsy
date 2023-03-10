import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/global/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm! : FormGroup;
  
  successMessage : boolean = false;
  errorMessage : boolean = false;
  fieldTextType: boolean;

  constructor(private formBuilder : FormBuilder,
    private authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name : ['Vahatra', Validators.required],
      email : ['associationvahatra2022@gmail.com', Validators.required],
      password : ['motdepasse', Validators.required]
    })
  }
  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  onSubmitRegisterForm(){
    this.authService.registerUser(this.registerForm.value).subscribe(
      (response) =>{ 
        // console.log("response received");
        this.successMessage = true;
        this.errorMessage = false;
      },
      (error)=>{        
        // console.error('request failed with error');
        if (error.status === 409){
          this.errorMessage = true;
          this.successMessage = false;
        }
      }
    )
  }

}
