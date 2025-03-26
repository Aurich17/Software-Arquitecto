import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'; // Importar módulo de InputText
import { PasswordModule } from 'primeng/password'; // Importar módulo de Password
import { DialogModule } from 'primeng/dialog';
import { LoginRequest } from './request/login.request';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule,PasswordModule, InputTextModule, CommonModule, ReactiveFormsModule, ButtonModule, DialogModule, MessageModule], // Importar correctamente
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean = false;
  errorMessage: string = '';
  visible: boolean = false;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private readonly authService: AuthService, private router: Router, private messageService: MessageService ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Cambié 'email' por 'username'
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }


  ngOnInit():void {
    this.iniciaFormulario();
  }

  iniciaFormulario(){
    this.registerForm = new FormGroup({
      username: new FormControl(null, null),
      password: new FormControl(null, null),
      correo: new FormControl(null, null),
      telefono: new FormControl(null, null)
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          if (response.success && response.token) {
            this.authService.setToken(response.token);
            this.authService.setRol(response.rol)
            this.authService.setRolId(response.rol_id)
            switch (response.rol) {
              case 'admin':
                this.router.navigate(['/']);
                break;
              case 'cliente':
                this.router.navigate(['/credito']);
                break;
              case 'corte_laser_1':
                this.router.navigate(['/corte_laser']);
                break;
              case 'corte_laser_2':
                this.router.navigate(['/corte_laser']);
                break;
              default:
                this.router.navigate(['/']);
                break;
            }
          } else {
            this.loginError = true;
            this.errorMessage = 'Usuario o contraseña incorrectos';
          }
        },
        (error) => {
          this.loginError = true;
          this.errorMessage = 'Error al iniciar sesión';
        }
      );
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }


  showDialog() {
    this.visible = true;
  }

  registerUser() {
    const values = this.registerForm.value;
    const request: LoginRequest = {
      username: values.username,
      password: values.password,
      email: values.correo,
      celular: values.telefono
    };

    this.authService.registerUser(request).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'El usuario se ha registrado correctamente'
        });
        this.visible = false; // Cierra el diálogo después de guardar
      },
      (error) => {
        console.error('Error al registrar:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el registro',
          detail: 'Hubo un problema al registrar el usuario'
        });
      }
    );
  }
}


// constructor(private authService: AuthService, private router: Router) {}

// logout() {
//   this.authService.logout();
//   this.router.navigate(['/login']);
// }
