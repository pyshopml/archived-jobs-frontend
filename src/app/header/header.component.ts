import {
	Component,
	Optional,
	OnInit,
	Injectable,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	EventEmitter,
	Input
} from '@angular/core';

import {AuthService} from '../app.auth';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
	//changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'main-header',
	// encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./header.component.css'
	],
	providers: [AuthService, NgbActiveModal, FormBuilder],
	template: `
    <nav class="header">
	    <div class="header__link">
			<span>
				<a [routerLink]=" ['./'] ">
					Вакансии
				</a>
			</span>
		</div>




      <div class="header__auth auth-btns">

			  <div class="col-sm-12">
			    <button (click)="signUp(contentModal)" class=" btn btn-primary" type="button" > Зарегистрироваться</button>
			  </div>

			  <div class="col-sm-12">
			    <button (click)="signIn(contentModal)" class="btn btn-primary" type="button">Войти</button>
			  </div>

			</div>

			 <template #contentModal  let-c="close" let-d="dismiss">
				  <div class="modal-header">
				    <h4 class="modal-title">Авторизация</h4>

				    <button type="button" class="close" aria-label="Close" (click)="d()">
				      <span aria-hidden="true">&times;</span>
				    </button>

				  </div>
				  <div class="modal-body">

				        <form [formGroup]="form" (ngSubmit)="doLogin($event)">

				          <div  *ngIf="!updatePassModal">

				            <div class="form-group" *ngIf="signUpModal">
									    <input  formControlName="name" type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Имя">
									  </div>

									  <div class="form-group">
									    <input formControlName="login" type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Адрес электронной почты">
									  </div>

									  <div class="form-group">
									    <input formControlName="pass" type="password" class="form-control"  placeholder="Пароль">
									  </div>

							      <a href="#" (click)="updatePass($event)">Восстановить пароль</a>

						      </div>

						      <div *ngIf="updatePassModal">

							       <div class="form-group">
										    <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Адрес электронной почты">
										  </div>

						      </div>

						      <div class="col-sm-12">
							        <button   class="btn btn-primary" type="submit">{{textSubmit}}</button>
						      </div>

					      </form>
					      <div *ngIf="!error">{{error}}</div>


				  </div>

				</template>
				<template ngbModalContainer></template>


      <div class="info" *ngIf="auth.authenticated">
          <div  class="status">Здравствуйте, {{auth.name || auth.getDisplayName}}</div>

            <button md-raised-button
                type="button"
                (click)="logOut()"
                class="btn-logout"
            >
            Выйти
            </button>

            <button md-button [mdMenuTriggerFor]="menu">Профиль пользователя</button>

            <md-menu #menu="mdMenu">
              <button [routerLink]=" ['./profile'] " md-menu-item>Настройки</button>

            </md-menu>


        <!--    <a [routerLink]=" ['./profile'] "
                type="button"
                class="btn-logout"
            >
              Настройки
            </a>-->

      </div>


    </nav>
  `
})
export class HeaderComponent implements OnInit {

	private signInModal:boolean = false;
	private signUpModal:boolean = false;
	private updatePassModal:boolean = false;

	private error:string;
	private name:string;

	private textSubmit:string;

	form:FormGroup;

	constructor(private auth:AuthService, public dialog:MdDialog, private modalService:NgbModal, private fb:FormBuilder) {
		console.log('HeaderComponent')
		console.log(ModalDismissReasons)

		this.form = fb.group({
			name: '',
			login: '',
			pass: '',
		});

		auth.displayName$.subscribe(
			name => {
				console.log('name$');
				console.log(name);
				this.name = name;


			});


		auth.modalContent$.subscribe(
			modal => {
				console.log('modal');
				console.log(modal);

				switch (modal) {
					case 'signUp':
						return this.signUpModal = true;

					case 'signIn':
						return this.signInModal = true;

					case 'updatePass':
						return this.updatePassModal = true;

				}

			});


	}

	resetModal() {
		this.signInModal = false;
		this.signUpModal = false;
		this.updatePassModal = false;
	}

	updatePass(event) {
		this.textSubmit = 'Восстановить пароль'
		console.log(event);
		event.preventDefault();
		this.auth.isModalContent('updatePass')
	}

	doLogin(event) {
		console.log(event);
		console.log(this.form.value);
		event.preventDefault()

		if (this.signUpModal) {
			this.signUpSubmit()
		}
		if (this.signInModal) {
			this.signInSubmit(this.form.value)
		}


	}


	open(content) {
		this.modalService.open(content).result.then((result) => {
			this.resetModal();//this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.resetModal();
		});
	}


	public ngOnInit() {
		console.log('Headeggr');
	}

	signUp(contentModal) {
		this.textSubmit = 'Зарегистрироваться'
		this.open(contentModal)
		this.auth.isModalContent('signUp')

	}

	signInSubmit():void {
		console.log('signIn-submiter')
		console.log(this.form.value)
		this.error = '';
		const login = this.form.value.login.trim(),
			pass = this.form.value.pass.trim()

		if (login.length && pass.length) {
			console.log('if')

			this.auth.signIn(login, pass).catch(error => {
				console.log('ERROR @ AuthService#signIn() :', error);
				this.error = error.message;

				console.log('error')
				console.log(this.error)

			}).then(res => {

				console.log('res')

			});


		}
	}

	signUpSubmit():void {
		console.log('signUp-submiter')
		console.log(this.form.value)
		this.error = '';
		const login = this.form.value.login.trim(),
			pass = this.form.value.pass.trim(),
			name = this.form.value.name.trim();

		if (login.length && pass.length && name.length) {
			this.auth.signUp(login, pass).catch(error => {
				console.log('ERROR @ AuthService#signUp() :', error);
				this.error = error.message;

				console.log('error')
				console.log(this.error)

			}).then(res => {
				console.log('error2')
				console.log(this.error)
				console.log('after')
				if (!this.error) {
					this.auth.updateProfile(name)

				}
			});

		}


	}

	signIn(contentModal) {
		this.textSubmit = 'Войти'
		this.open(contentModal)
		this.auth.isModalContent('signIn')
	}


	logOut() {
		console.log('logOut')
		this.auth.logOut();

	}

}

@Component({
	providers: [AuthService],
	selector: 'modal-app',
	providers: [AuthService, NgbActiveModal],
	template: `


  <!--  <div md-dialog-title>Зарегистрироваться</div>
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

    	<div>{{error}}</div>-->
  `,
})
@Injectable()
export class DialogContent implements OnInit {
	@Input() name;

	subscription:Subscription<any>;

	constructor(@Optional() private auth:AuthService, public activeModal:NgbActiveModal) {
		//console.log('DialogContent')
		//console.log(this)

		auth.modalContent$.subscribe(
			modal => {
				console.log('modalll');
				console.log(modal);
			});

		/*  this.subscription = auth.modalContent$.subscribe(
		 modal => {
		 console.log('modal');
		 console.log(modal);
		 });
		 console.log('this.subscription')
		 console.log(this.subscription)*/

		/*    this.subscription = this.auth.navItem$
		 .subscribe(item => {
		 console.log(' this.subscription')
		 console.log(item)
		 console.log(auth.navItem)
		 })
		 */

		/*  auth.dialogEvent.subscribe(data => {
		 // console.log('dialogEvent.subscribe')
		 //console.log(data)
		 });*/

		/*     this.subscription = this._navService.navChange$.subscribe(
		 item => {
		 console.log(' this.subscription')
		 console.log(item)
		 console.log(auth.navItem)
		 });*/


		/*   this.subscription = this.auth.navChange$.subscribe(
		 item => {
		 console.log('itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
		 console.log(item)
		 })*/
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
		name: ''
	};

	dialog = {
		signIn: false,
		signUp: false
	}

	get getDialog():string {
		return this.dialog;
	}

	resetDialog():void {
		this.dialog.signIn = false;
		this.dialog.signUp = false;
	}

	status() {
		//console.log('status')
		//console.log(this.getDialog)
	}


	signUp():void {
		console.log('signUp')
		console.log(this.user)
		this.error = '';
		const login:any = this.user.login.trim(),
			pass:any = this.user.pass.trim(),
			name:any = this.user.name.trim();

		if (login.length && pass.length && name.length) {
			this.auth.signUp(login, pass).catch(error => {
				console.log('ERROR @ AuthService#signUp() :', error);
				this.error = error.message;

				console.log('error')
				console.log(this.error)

			}).then(res => {
				console.log('error2')
				console.log(this.error)
				console.log('after')
				if (!this.error) {
					this.auth.updateProfile(name)

				}
			});

		}


	}
}
