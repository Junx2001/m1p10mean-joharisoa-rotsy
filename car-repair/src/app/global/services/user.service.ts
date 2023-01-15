import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor ( ){}
    allUsers(): User [] {
        return [{
            email : "joh@gmail.com",
            name : "Joharisoa",
            password : "mdp123",
            role : "client",
            active : 0
          },
          {
            email : "ro@gmail.com",
            name : "Rotsy",
            password : "mdp123",
            role : "client",
            active : 0
          },]
    }
    
    getUserByCredentials(formValue: { email:string, password:string }): User{
        return this.allUsers().find(user => user.email === formValue.email);
    }

    registerUser(formValue: { name:string, email: string, password:string }): void{
        console.log(formValue);
        console.log("user registered");
    }

    getUserByToken(token: string): User{
        return this.allUsers()[1];
    }

}