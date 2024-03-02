import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  FirebaseOptions,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

import { Store } from 'store';
import { appRoutes } from './app.routes';

export const firebaseConfig: FirebaseOptions = {
  projectId: 'aditek-fitness-app-2024',
  appId: '1:1089752226380:web:005ae96d8ed36486cd72e9',
  storageBucket: 'aditek-fitness-app-2024.appspot.com',
  apiKey: 'AIzaSyACfUFy_W4XlSVyVPSb4UPJQhOwrfjOnSA',
  authDomain: 'aditek-fitness-app-2024.firebaseapp.com',
  messagingSenderId: '1089752226380',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    Store,
  ],
};
