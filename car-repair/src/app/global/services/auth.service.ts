import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor (private http : HttpClient){}

    setHeaders (){
        let header = new HttpHeaders();
        header = header.append('Access-Control-Allow-Credentials','true');
        header = header.append('Access-Control-Allow-Origin',apiUrl.key);
        return header;
    }
    login(formValue: { email:string, password:string }): Observable<any>{
        const body = {
            "email": formValue.email,
            "password": formValue.password
        }
        return this.http.post<any>(`${apiUrl.key}/users/login`, body ,{headers:this.setHeaders()});
      }
    registerUser(formValue: { name:string, email: string, password:string }): Observable<any>{
        const body = {
            "name": formValue.name,
            "email": formValue.email,
            "password": formValue.password
        }
        return this.http.post<any>(`${apiUrl.key}/users/signup`, body ,{headers:this.setHeaders()});
    }
    activateAccount(userId : string, secretToken : string): Observable<any>{
        return this.http.post<any>(`${apiUrl.key}/users/verify/${userId}/${secretToken}`, null ,{headers:this.setHeaders()});
    }

}