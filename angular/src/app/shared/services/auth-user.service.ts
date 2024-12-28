import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private api = 'http://localhost:3000'
  constructor(private http:HttpClient, private jwtHelper:JwtHelperService) { }

  registration(user:any):Observable<any>{
    return this.http.post<{token:string,message:string}>(`${this.api}/register`,user)
  }
  login(user:{email:string,password:string}){
    return this.http.post<{token:string,message:string}>(`${this.api}/login`,user)
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !token && !this.jwtHelper.isTokenExpired(token);
  }

  isNotAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }
}
