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
        pass: '',
        name:''
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
        const login: any = this.user.login.trim(),
            pass: any = this.user.pass.trim();

        if (login.length && pass.length) {
            this.auth.signIn(login, pass)
        }
    }

   /* signUp():void {
        console.log('signUp')
        console.log(this.user)

        const login: any = this.user.login.trim(),
            pass: any = this.user.pass.trim(),
            name: any = this.user.name.trim();

        if (login.length && pass.length && name.length) {
            this.auth.signUp(login, pass)
            this.auth.updateProfile(name)
        }


    }*/

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
