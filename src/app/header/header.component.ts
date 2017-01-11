
import {
    Component,
    Optional,
    OnInit,
    Injectable,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    EventEmitter
} from '@angular/core';

import {AuthService} from '../app.auth';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';

@Component({
   //changeDetection: ChangeDetectionStrategy.OnPush,
    //selector: 'main-header',
   // encapsulation: ViewEncapsulation.None,
    /* styleUrls: [
     './header.css'
     ],*/
    providers: [AuthService],
    template: `
    <nav class="header">
      <span>
        <a [routerLink]=" ['./home'] ">
          Вакансии
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./'] ">
          Авторизация
        </a>

      </span>

      <button md-raised-button (click)="openDialog()">Зарегистрироваться</button>
      <button md-raised-button (click)="signIn()">Войти</button>


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
export class HeaderComponent implements OnInit {

    constructor(private auth: AuthService,public dialog: MdDialog) {
        console.log('HeaderComponent')
        console.log(this)
    }

    private dialogRef : any;

    public ngOnInit() {
        console.log('Header');
    }

    openDialog() {
        this.auth.setDialog('signUp');
        this.dialogRef = this.dialog.open(DialogContent);
        //this.dialog.open();
        this.dialogRef.afterClosed().subscribe(result => {
            this.auth.resetDialog()
            console.log(this.auth.getDialog)
        })

        console.log('signIn--')

        console.log(this.auth.getDialog)
    }

    signIn() {
        this.auth.changeNav(88)
        this.auth.setDialog('signIn');
        this.dialogRef = this.dialog.open(DialogContent);
        //this.dialog.open();
        this.dialogRef.afterClosed().subscribe(result => {
            console.log('resetDialog')
            this.auth.resetDialog()
            console.log(this.auth.getDialog)
        })
        console.log('signIn--')

        console.log(this.auth.getDialog)
    }

   save(){
       console.log('save');
       console.log(this.dialogRef);
   }


    logOut(){
        console.log('logOut')
        this.auth.logOut();

    }

}

@Component({
    providers: [AuthService],
    selector:'modal',
    template: `
    <div md-dialog-title>Зарегистрироваться</div>
    <div md-dialog-content>

    </div>

    <p>
      <label>
        This is a text box inside of a dialog.
        <input
				type="text"
				[(ngModel)]="user.name"
				name="name"
				placeholder="Имя"
				*ngIf="status()"
		>
		<input
				type="text"
				[(ngModel)]="user.login"
				name="login"
				placeholder="Логин"
		>
		<input
				type="text"
				[(ngModel)]="user.pass"
				name="pass"
				placeholder="Пароль"
        >
      </label>
    </p>
    <div md-dialog-actions>
        <button md-button (click)="dialogRef.close()">CLOSE</button>
        <button md-button (click)="signUp()">Зарегистрироваться</button>
    </div>

    	<div>{{error}}</div>
  `,
})
@Injectable()
export class DialogContent  implements OnInit{

    subscription:Subscription<any>;
    constructor(@Optional()  private auth: AuthService, public dialogRef: MdDialogRef<DialogContent>) {
        console.log('DialogContent')
        console.log(this)

    /*    this.subscription = this.auth.navItem$
            .subscribe(item => {
                console.log(' this.subscription')
                console.log(item)
                console.log(auth.navItem)
            })
*/

        auth.dialogEvent.subscribe(data => {
            console.log('dialogEvent.subscribe')
           console.log(data)
        });

   /*     this.subscription = this._navService.navChange$.subscribe(
            item => {
                console.log(' this.subscription')
                console.log(item)
                console.log(auth.navItem)
            });*/


        this.subscription = this.auth.navChange$.subscribe(
            item => {
                console.log('itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
                console.log(item)
            })
    }
    /*    auth.dialogEvent.subscribe.(data => {
            console.log('data-DialogContent')
            console.log(data)
        });*/

    public ngOnInit() {
        console.log('Header-ng-init');
    }





    private error:string = "";

    user = {
        login: '',
        pass: '',
        name:''
    };

    dialog = {
        signIn:false,
        signUp:false
    }

    get getDialog():string{
        return this.dialog;
    }
    resetDialog(): void{
        this.dialog.signIn = false;
        this.dialog.signUp = false;
    }

    status(){
        //console.log('status')
        //console.log(this.getDialog)
    }


    signUp():void {
        console.log('signUp')
        console.log(this.user)
        this.error = '';
        const login: any = this.user.login.trim(),
            pass: any = this.user.pass.trim(),
            name: any = this.user.name.trim();

        if (login.length && pass.length && name.length) {
            this.auth.signUp(login, pass).catch(error => {
                console.log('ERROR @ AuthService#signUp() :', error);
                this.error = error.message;

                console.log('error')
                console.log(this.error)

            }).then(res =>{
                console.log('error2')
                console.log(this.error)
                    console.log('after')
                if(!this.error){
                    this.auth.updateProfile(name)
                    this.dialogRef.close()
                }
                });

        }


    }
}
