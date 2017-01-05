/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import {AuthService} from './app.auth';
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
      <div class="status" *ngIf="auth.authenticated">Вы авторизованы</div>
        <button
            type="button"
            (click)="logOut()"
            *ngIf="auth.authenticated"
            class="btn-logout"
    >
      Выйти
    </button>
    </nav>

    <main class="main">
      <router-outlet></router-outlet>
    </main>

   <!-- <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>-->
  `
})
export class AppComponent implements OnInit {

  constructor(public appState: AppState,private auth: AuthService) {}

  public ngOnInit() {
      console.log(this.auth)
    console.log('Initial App State', this.appState.state);
  }

    logOut(){
        console.log('logOut')
        this.auth.logOut();

    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
