import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';

import { Store } from 'store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'aditek-fitness-app-2024',
          appId: '1:1089752226380:web:005ae96d8ed36486cd72e9',
          storageBucket: 'aditek-fitness-app-2024.appspot.com',
          apiKey: 'AIzaSyACfUFy_W4XlSVyVPSb4UPJQhOwrfjOnSA',
          authDomain: 'aditek-fitness-app-2024.firebaseapp.com',
          messagingSenderId: '1089752226380',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideAnalytics(() => getAnalytics())),
    ScreenTrackingService,
    UserTrackingService,
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideRemoteConfig(() => getRemoteConfig())),
    Store
  ],
};
