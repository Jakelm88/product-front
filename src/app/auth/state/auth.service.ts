import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) {};

    signUp(user: User) {
        return this.httpClient.post('http://localhost:3000/api/auth/signup', user);
    }

    signIn(user: User) {
        return this.httpClient.post<{ userId: any, token: string }>('http://localhost:3000/api/auth/login', user);
    }

    signOut() {
        localStorage.removeItem('token');
    }

}
