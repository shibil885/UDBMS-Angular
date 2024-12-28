import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  private api: string = 'http://localhost:3000/admin';
  private http = inject(HttpClient);
  constructor(private jwtHelper: JwtHelperService) {}

  adminLogin(admin: { email: string; password: string }) {
    return this.http.post<string>(`${this.api}/login`, admin);
  }

  getAllUsers() {
    return this.http.get<IUser[]>(`${this.api}/getAllUsers`);
  }

  removeUser(email: string) {
    return this.http.put(`${this.api}/removeUser`, { email });
  }

  editUser(user: { _id: string; name: string; phone: string; email: string }) {
    return this.http.put(`${this.api}/editUser`, user);
  }

  addUser(user: IUser) {
    return this.http.post(`${this.api}/addUser`, user);
  }

  isAuthenticatedAdmin(): boolean {
    const token = localStorage.getItem('adminToken');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  isNotAuthenticatedAdmin(): boolean {
    const token = localStorage.getItem('adminToken');
    return !token || this.jwtHelper.isTokenExpired(token);
  }
}
