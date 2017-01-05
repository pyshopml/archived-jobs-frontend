import {
    Component,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "../app.auth";

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

    public localState:any;

    user = {
        login: '',
        pass: ''
    };

    constructor(private auth:AuthService) {
    }

    public ngOnInit() {
        console.log('hello `Auth` component');
        console.log(this.auth)
    }

    signIn():void {
        console.log('signIn')
        console.log(this.user)
        this.auth.signIn(this.user.login, this.user.pass)
    }

    signUp():void {
        console.log('signUp')
        console.log(this.user)
        this.auth.signUp(this.user.login, this.user.pass)
    }

    logOut():void {
        console.log('logOut')
        this.auth.logOut();

    }

    /*public ngOnInit() {
     console.log('ngOnInittttttttt')
     console.log(this.route.data)
     this.route
     .data
     .subscribe((data: any) => {
     // your resolved data from route
     this.localState = data.yourData;
     console.log('data.yourData')
     console.log(data.yourData)
     });
     }*/


}
