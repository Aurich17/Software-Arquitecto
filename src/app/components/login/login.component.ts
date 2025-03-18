import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'; // Importar módulo de InputText
import { PasswordModule } from 'primeng/password'; // Importar módulo de Password

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule,InputTextModule,CommonModule, ReactiveFormsModule,ButtonModule], // Importar correctamente
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (this.authService.login(email, password)) {
        console.log('Llega al Route')
        this.router.navigate(['/credito']); // Redirige después del login
      } else {
        this.loginError = true;
      }
    }
  }
}


// constructor(private authService: AuthService, private router: Router) {}

// logout() {
//   this.authService.logout();
//   this.router.navigate(['/login']);
// }
