import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Material from "@primeng/themes/material";
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    providePrimeNG({
    theme: {
          preset: Aura, // Tema claro asegurado
          options: {
            darkModeSelector: false,
            dark: false, // Forzar modo claro
            prefix: 'my'
          }
      }
  })
  ]
};
