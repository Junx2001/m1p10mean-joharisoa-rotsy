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

    setHeaders (){
        let header = new HttpHeaders();
        header = header.append('Access-Control-Allow-Credentials','true');
        header = header.append('Access-Control-Allow-Origin',this.apiUrl);
        return header;
    }
    login(formValue: { email:string, password:string }): Observable<any>{
        const body = {
            "email": formValue.email,
            "password": formValue.password
        }
        return this.http.post<any>(`${this.apiUrl}/users/login`, body ,{headers:this.setHeaders()});
      }
    registerUser(formValue: { name:string, email: string, password:string }): Observable<User>{
        const body = {
            "name": formValue.name,
            "email": formValue.email,
            "password": formValue.password
        }
        return this.http.post<User>(`${this.apiUrl}/users/signup`, body ,{headers:this.setHeaders()});
    }

    getToken() : string{
        return this.token;
    }
    logout(user: User): void{
        user.active = 0;
    }
}