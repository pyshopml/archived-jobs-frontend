import { Injectable,EventEmitter } from '@angular/core';
import { AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState, AngularFire } from 'angularfire2';
import _ from "lodash";

//import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {
    private authState:FirebaseAuthState = null;
    //private error:string = "";
    private name:string = "";
    private dialogMode:string = "";
    private _navItem = 0;
    navChange$: Observable<any>;
    private _navItemSource = new BehaviorSubject<number>(2);
    private _observer: Observer;

    //navItem$ = this._navItemSource.asObservable();
    // service command


    get navItem() {
        return this._navItem;
    }

    dialog = {
        signIn:false,
        signUp:false
    }

    private dialogEvent: EventEmitter<any> = new EventEmitter();

    share(obj) {
        console.log('share')
        this.dialogEvent.emit(obj);
        console.log(this.dialogEvent)
    }

    subShare() {
        console.log('subShare')
        return this.dialogEvent.subscribe();
    }
   /* subscribe(component, callback) {
        // set 'this' to component when callback is called
        return this.dialogEvent.subscribe(data => call.callback(component, data));
    }*/


    constructor(public auth$:FirebaseAuth){
    console.log('AuthService')
    console.log(this._observer)
    console.log(this.navChange$)
    auth$.subscribe((state:FirebaseAuthState) => {
        //console.log('state')
        //console.log(state)
        this.authState = state;

    });

    this.navChange$ = new Observable(observer =>{
        console.log('observer')
        console.log(observer)
    }).share();
    // share() allows multiple subscribers
}



    changeNav(number) {
        console.log('changeNav')
        console.log(this._observer)
        //this.navChange$.next(77)
        this._navItem = number;
        //this._observer.next(number);
        console.log(this.navItem$)
    }

     /*   this.dialog.subscribe(
            (data) => {
                console.log('data')
                console.log(data)
                this.dialogEvent.emit(data);
            })*/

    get authenticated():boolean {
        //console.log('authenticated')
        //console.log(this.authState)
        return this.authState !== null;
    }

    get displayName():string {

        return this.authState.auth.displayName;

    }

    setDialog(mode){
        this.dialogMode = mode;
        console.log('this.dialogMode')
        console.log(this.dialogMode)
        console.log(this.dialog)
        _.mapKeys(this.dialog, (value, key) => {
            this.dialog[key] = false
            console.log('map')
            console.log(this.dialog)
        });
        this.dialog[mode] = true;
        console.log('mode')
        console.log(this.dialog)
    }

    get getDialog():string{
        return this.dialog;
    }
    resetDialog(): void{
        this.dialog.signIn = false;
        this.dialog.signUp = false;
    }

    get id():string {
        return this.authenticated ? this.authState.uid : '';
    }

    get success():bool {
        return this.successUpdate;
    }

    signUp(email:string, password:string, name:string):firebase.Promise<FirebaseAuthState> {
        var creds:any = {email: email, password: password};
        this.error = '';

        console.log('signUp-service')
        return this.auth$.createUser(creds)
    }

    signIn(email:string, password:string):firebase.Promise<FirebaseAuthState> {
        var creds:any = {email: email, password: password};
        this.error = '';

        return this.auth$.login(creds)
            .catch(error => {
                console.log('ERROR @ AuthService#signIn() :', error)
                this.error = error.message;
            });
    }

    updateProfile(name) {
        this.name = name;
        return this.auth$.subscribe((state:FirebaseAuthState) => {
            console.log('updateProfile')
            console.log(state)

            if (state) {
                state.auth.updateProfile({displayName: name}).then(
                    success =>  console.log(this.authState.auth.displayName)
                )
            }

        });
    }

    logOut():void {
        this.auth$.logout();
    }

    signOut():void {
        this.auth$.logout();
    }
}
