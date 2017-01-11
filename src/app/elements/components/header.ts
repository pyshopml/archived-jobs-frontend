
import {
  Component,
    Optional,
  OnInit,
  ViewEncapsulation,
    ChangeDetectionStrategy,
} from '@angular/core';

import {AuthService} from '../../app.auth';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'main-header',
  encapsulation: ViewEncapsulation.None,
 /* styleUrls: [
    './header.css'
  ],*/
    providers: [AuthService],
  template: `
   <nav class="header">
      <span>
        <a [routerLink]=" ['./home'] ">
          Вакансииggggggg
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./'] ">
          Авторизация
        </a>
      </span>

      <div class="info" *ngIf="auth.authenticated">
          <div  class="status">Здравствуйте, {{auth.displayName}}</div>

            <button md-raised-button
                type="button"
                (click)="logOut()"
                class="btn-logout"
            >
            Выйти
            </button>

            <button md-button [mdMenuTriggerFor]="menu">Menu</button>

            <md-menu #menu="mdMenu">
              <button md-menu-item>Item 1</button>
              <button md-menu-item>Item 2</button>
            </md-menu>

            <button md-button (click)="openDialog()">Open dialog</button>

            <a [routerLink]=" ['./profile'] "
                type="button"
                class="btn-logout"
            >
              Настройки
            </a>

      </div>


    </nav>
  `
})
export class Header implements OnInit {

  constructor(private auth: AuthService,public dialog: MdDialog) {
      console.log('Header-constructor')
      console.log(this.auth)
      console.log(this.auth.authState !== null)
  }

  public ngOnInit() {
    console.log('Header');
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
