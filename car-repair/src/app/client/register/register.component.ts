import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/global/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm! : FormGroup;
  constructor(private formBuilder : FormBuilder,
    private userService : UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name : [null, Validators.required],
      email : [null, Validators.required],
      password : [null, Validators.required]
    })
  }
  onSubmitRegisterForm(){
    this.userService.registerUser(this.registerForm.value);
  }

}
