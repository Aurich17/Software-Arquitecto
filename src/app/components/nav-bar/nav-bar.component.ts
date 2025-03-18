import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 Importar esto

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    RouterModule,        // Importar RouterModule para los enlaces de navegación
    MatToolbarModule,    // Importar MatToolbarModule para la barra de herramientas
    MatIconModule,       // Importar MatIconModule para los íconos
    MatMenuModule,        // Importar MatMenuModule para el menú desplegable
    MatButtonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {}
