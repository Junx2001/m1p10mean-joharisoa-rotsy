import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://m1p10mean-joharisoa-rotsyapi-production.up.railway.app';

  constructor ( private http : HttpClient){}

    getCurrentUser():Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/users/me`);
    }
    
}