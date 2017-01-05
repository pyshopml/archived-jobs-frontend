import { Injectable } from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState, AngularFire } from 'angularfire2';


@Injectable()
export class AuthService {
  private authState: FirebaseAuthState = null;
  private error: string = "";

  constructor(public auth$: FirebaseAuth) {
    auth$.subscribe((state: FirebaseAuthState) => {
        console.log('state')
        console.log(state)
      this.authState = state;
        console.log(this.authState !== null)
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

    /*get error(): any {
        return this.error;
    }*/

  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  signUp(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    var creds: any = {email: email, password: password};
      this.error = '';
    return this.auth$.createUser(creds)
      .catch(error => {
          console.log('ERROR @ AuthService#signUp() :', error);
          this.error = error;
      });
  }

    signIn(email: string, password: string): firebase.Promise<FirebaseAuthState> {
        var creds: any = {email: email, password: password};
        this.error = '';
        return this.auth$.login(creds)
            .catch(error => {
                console.log('ERROR @ AuthService#signIn() :', error)
                this.error = error;
            });
    }

    logOut(): void {
        this.auth$.logout();
    }

  signOut(): void {
    this.auth$.logout();
  }
}
