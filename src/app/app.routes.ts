import { Routes } from '@angular/router';
import { CreditoComponent } from './components/credito/credito.component';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CorteLaserComponent } from './components/corte-laser/corte-laser.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent}, // Evita acceso al login si ya está autenticado
  { path: 'credito', component: CreditoComponent, canActivate: [AuthGuard] },
  { path: 'corte_laser', component: CorteLaserComponent, canActivate: [AuthGuard] },
  { path: 'portafolio', component: CreditoComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent},
];
