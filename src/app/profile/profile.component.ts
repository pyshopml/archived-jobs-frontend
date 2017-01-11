import {
    Component,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "../app.auth";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {


    constructor(private auth:AuthService) {
    }

    profile = {
        name:this.auth.displayName
    };

    public ngOnInit() {
        console.log('hello `Profile` component');
        console.log(this.auth)
    }

    public save(){
        console.log('save');
        this.auth.updateProfile(this.profile.name)
        console.log('this.auth.displayName')
        console.log(this.auth.displayName)
    }
}
