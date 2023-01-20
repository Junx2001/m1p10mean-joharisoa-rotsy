import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor ( private http : HttpClient){}

    getCurrentUser():Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/users/me`);
    }
    
}