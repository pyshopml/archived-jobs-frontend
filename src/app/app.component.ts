/*
 * Angular 2 decorators and services
 */
import {
  Component,
    Optional,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import {AuthService} from './app.auth';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
/*

 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
    providers: [AuthService],
  template: `
    <main-header></main-header>

    <main class="main">
      <router-outlet></router-outlet>
    </main>

   <!-- <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>-->
  `
})
export class AppComponent implements OnInit {

  constructor(public appState: AppState, private auth: AuthService,public dialog: MdDialog) {
      console.log('AppComponent-constructor')
      console.log(this.auth)
      console.log(this.auth.authState !== null)
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
      console.log(this.auth)
      console.log(this.auth.authState !== null)
  }

    openDialog() {
        let dialogRef = this.dialog.open(DialogContent);
        //this.dialog.open();
    }

    logOut(){
        console.log('logOut')
        this.auth.logOut();

    }

}

@Component({
    template: `
    <p>This is a dialog</p>
    <p>
      <label>
        This is a text box inside of a dialog.
        <input #dialogInput>
      </label>
    </p>
    <p> <button md-button (click)="dialogRef.close(dialogInput.value)">CLOSE</button> </p>
  `,
})
export class DialogContent {
    constructor(@Optional() public dialogRef: MdDialogRef<DialogContent>) { }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
