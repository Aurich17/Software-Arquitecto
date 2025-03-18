import { Routes } from '@angular/router';
import { CreditoComponent } from './components/credito/credito.component';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [ // Página de inicio (puedes cambiarla)
  { path: '**', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'credito', component: CreditoComponent, canActivate: [AuthGuard]  }, // Ruta para el crédito
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirección en caso de rutas incorrectas

];
