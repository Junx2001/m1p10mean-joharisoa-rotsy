import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor ( private http : HttpClient){}

    getCurrentUser():Observable<any>{
      return this.http.get<any>(`${apiUrl.key}/users/me`);
    }
    
}