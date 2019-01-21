import {Component, ViewEncapsulation} from '@angular/core';
import {AccountService} from "./service/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'angular-app';

  constructor(private accountService: AccountService) { }
}
