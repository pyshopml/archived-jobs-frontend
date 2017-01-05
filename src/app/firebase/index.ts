import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDsSfXQQdOYpwfsHq7JovIl1QRhdRk0dCw",
  authDomain: "jobs-513dd.firebaseapp.com",
  databaseURL: "https://jobs-513dd.firebaseio.com",
  storageBucket: "jobs-513dd.appspot.com",
  messagingSenderId: "333654529753"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};


export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);

export const FirebaseApp = firebase.initializeApp(firebaseConfig);