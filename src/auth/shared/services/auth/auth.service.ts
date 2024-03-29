import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { tap } from 'rxjs';

import { Store } from 'store';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  private _auth: Auth = inject(Auth);
  private _store: Store = inject(Store);

  auth$ = authState(this._auth).pipe(
    tap((next) => {
      if (!next) {
        this._store.set('user', null);
        return;
      }
      const user: User = {
        email: next?.email!,
        uid: next?.uid!,
        authenticated: true,
      };
      this._store.set('user', user);
    })
  );

  get user() {
    return this._auth.currentUser;
  }

  get authState() {
    return authState(this._auth);
  }

  createUser(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  loginUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  logoutUser() {
    return signOut(this._auth);
  }
}
