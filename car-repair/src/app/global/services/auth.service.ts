import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor (){}
    private token! : string;

    addToken(user : User): string{
        // insert token
        return "MyNewToken";
    }
    login(user : User){
        this.token = this.addToken(user);
        user.active = 1;
        // update active in backend
    }
    getToken() : string{
        return this.token;
    }
}