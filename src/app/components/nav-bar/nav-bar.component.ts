import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-nav-bar',
  standalone: true, // Agregar standalone si es necesario
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    TieredMenuModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  items: any[] = [];

  constructor(private readonly service: AuthService) { }

  ngOnInit() {
    this.cargarMenu();
  }

  cargarMenu() {
    const allItems = [
      { label: 'Crédito', icon: 'pi pi-credit-card', routerLink: ['/credito'] },
      { label: 'Corte Laser', icon: 'pi pi-cog', routerLink: ['/corte_laser'] },
      { label: 'Portafolio', icon: 'pi pi-briefcase', routerLink: ['/portafolio'] }
    ];

    // Filtra los elementos del menú según el rol del usuario
    this.items = allItems.filter(item => this.verificarRol(item.label));
  }

  verificarRol(label: string): boolean {
    const usuarioRol = this.obtenerRolUsuario();

    const permisos: { [key: string]: string[] } = {
      'Crédito': ['admin', 'cliente'],
      'Corte Laser': ['admin', 'corte_laser_1', 'corte_laser_2','cliente'],
      'Portafolio': ['admin', 'cliente']
    };

    return permisos[label]?.includes(usuarioRol) ?? false;
  }

  obtenerRolUsuario(): string {
    // Simula la obtención del rol (ajusta esto según cómo obtienes el rol del usuario)
    return localStorage.getItem('rol') || '';
  }

  cerraSesion() {
    this.service.logout();
  }
}
