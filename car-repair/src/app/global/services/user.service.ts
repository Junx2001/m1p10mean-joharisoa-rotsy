import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor ( private http : HttpClient){}

  login(formValue: { email:string, password:string }): Observable<any>{
    let body = new URLSearchParams();
    body.set('email', formValue.email);
    body.set('password', formValue.password);
    
    let header = new HttpHeaders();
    header = header.append('Access-Control-Allow-Credentials','true');
    header = header.append('Access-Control-Allow-Origin',this.apiUrl);
    
    return this.http.post<any>(`${this.apiUrl}/users/login`, body.toString() ,{headers:header});

  }
  allUsers(): User [] {
      return [{
          id : 1,
          email : "joh@gmail.com",
          name : "Joharisoa",
          password : "mdp123",
          role : "client",
          active : 0
        },
        {
          id : 2,
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

    logout(user: User): void{
      user.active = 0;
    }
}