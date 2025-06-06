import { bootstrapApplication }         from '@angular/platform-browser';
import { provideRouter }               from '@angular/router';
import { provideHttpClient }           from '@angular/common/http';
import { provideZoneChangeDetection }  from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes }       from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
  ]
}).catch(err => console.error(err));
