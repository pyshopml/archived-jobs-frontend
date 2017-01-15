import { Injectable,EventEmitter } from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState, AngularFire } from 'angularfire2';
import _ from "lodash";

//import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
	public authState:FirebaseAuthState = null;


	public modalContentSource = new Subject<string>();
    public displayName = new Subject<string>();
	public name :string;

	modalContent$ = this.modalContentSource.asObservable();
	displayName$ = this.displayName.asObservable();

	isModalContent(content: string) {
		console.log('isModalContent')
		this.modalContentSource.next(content);
	}

    constructor(public auth$:FirebaseAuth){
	    console.log('AuthService')
	    auth$.subscribe((state:FirebaseAuthState) => {

	        this.authState = state;

	    });
	}
    get authenticated():boolean {

        return this.authState !== null;
    }

    get id():string {
        return this.authenticated ? this.authState.uid : '';
    }

	get getDisplayName():string {
		return this.authState.auth.displayName;

	}

    signUp(email:string, password:string, name:string):firebase.Promise<FirebaseAuthState> {
        var creds:any = {email: email, password: password};

        console.log('signUp-service')
        return this.auth$.createUser(creds)
    }

    signIn(email:string, password:string):firebase.Promise<FirebaseAuthState> {
        var creds:any = {email: email, password: password};

        return this.auth$.login(creds)

    }

    updateProfile(name) {
        this.name = name;
        return this.auth$.subscribe((state:FirebaseAuthState) => {
            console.log('updateProfile')
            console.log(state)

            if (state) {
                state.auth.updateProfile({displayName: name}).then(
                    success =>  {
	                    console.log('this.authState.auth.displayName')
	                    console.log(this.authState.auth.displayName)
	                    this.name = this.authState.auth.displayName
	                    this.setDisplayName(this.authState.auth.displayName)
                    }
                )
            }

        });
    }

	setDisplayName(name){
		console.log('setDisplayName')
		this.displayName.next(name);
	}


	logOut():void {
        this.auth$.logout();
    }
}
