import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000';

    constructor (private http : HttpClient){}
    private token! : string;

    addToken(user : User): string{
        // insert token
        return "MyNewToken";
    }
    login(formValue: { email:string, password:string }): Observable<any>{
        let body = new URLSearchParams();
        body.set('email', formValue.email);
        body.set('password', formValue.password);
        
        let header = new HttpHeaders();
        header = header.append('Access-Control-Allow-Credentials','true');
        header = header.append('Access-Control-Allow-Origin',this.apiUrl);
        
        return this.http.post<any>(`${this.apiUrl}/users/login`, body.toString() ,{headers:header});
    
      }
    // login(user : User){
    //     this.token = this.addToken(user);
    //     user.active = 1;
    //     // update active in backend
    // }
    getToken() : string{
        return this.token;
    }
    logout(user: User): void{
        user.active = 0;
    }
}