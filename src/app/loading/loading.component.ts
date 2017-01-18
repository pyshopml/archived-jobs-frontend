import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @Input() size: number = 200;
  @Input() value: number = 0;
  @Input() color: string = 'primary';
  @Input() mode: string = 'indeterminate';
}
