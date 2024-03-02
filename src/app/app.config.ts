import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { Store } from 'store';
import { appRoutes } from './app.routes';
import { authProvider } from '../auth/auth.config';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), Store, authProvider],
};
