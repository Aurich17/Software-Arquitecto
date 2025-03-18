import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  login(email: string, password: string): boolean {
    // Simulación de credenciales (reemplázalo con una API real)
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('token', 'autenticado');
      console.log('logueado')
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
