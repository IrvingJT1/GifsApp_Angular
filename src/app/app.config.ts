import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes),
  
  //Así se provee de httpClient para que pueda ser usado globalmente en la app
  //Se sugiere usar la nueva funcionalidad withFetch, 
  //En caso de no poner nada se harán peticiones xhr como antes
  provideHttpClient(withFetch())
],

};
