import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import {jwtDecode} from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../components/login/request/login.request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  private tokenKey = 'token';
  private authStatus = new BehaviorSubject<boolean>(this.checkToken());
  constructor(private router: Router,private http: HttpClient) {}

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  // }


  private checkToken(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp && decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  registerUser(request:LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`,request);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authStatus.next(true);
  }
}
