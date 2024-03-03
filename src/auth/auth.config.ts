import { Provider, importProvidersFrom } from '@angular/core';
import {
  FirebaseOptions,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { AuthService } from './shared/services/auth/auth.service';

export const firebaseConfig: FirebaseOptions = {
  projectId: 'aditek-fitness-app-2024',
  appId: '1:1089752226380:web:005ae96d8ed36486cd72e9',
  storageBucket: 'aditek-fitness-app-2024.appspot.com',
  apiKey: 'AIzaSyACfUFy_W4XlSVyVPSb4UPJQhOwrfjOnSA',
  authDomain: 'aditek-fitness-app-2024.firebaseapp.com',
  messagingSenderId: '1089752226380',
};

export const authProvider: Provider = [
  importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
  importProvidersFrom(provideAuth(() => getAuth())),
  importProvidersFrom(provideDatabase(() => getDatabase())),
  AuthService,
];
