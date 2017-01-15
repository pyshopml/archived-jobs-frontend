import {
    Component,
    OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import {AuthService} from "../app.auth";

@Component({
    selector: 'home',
    providers: [

     ],
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    private status:string;

    constructor(private auth:AuthService) {
    }

    public ngOnInit() {
        console.log('hello `Home` component');
    }

    public submitState(value:string) {
        console.log('submitState', value);
    }
}
