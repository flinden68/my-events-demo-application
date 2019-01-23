import {Component, ViewEncapsulation} from '@angular/core';
import {AccountService} from "./service/account.service";
import {TranslateService} from '@ngstack/translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'angular-app';

  constructor(private accountService: AccountService, private translate: TranslateService) {
    //this.check();
    //this.checkChangeAccount();

  }


  changeLang(lang: string) {
    this.translate.activeLang = lang;
  }

  /*check(){
    this.translate.activeLangChanged.subscribe(
      (event: { previousValue: string; currentValue: string }) => {
        console.log(event.previousValue);
        console.log(event.currentValue);
        console.log("Title: " + this.translate.get("website-title"))
      }
    );
  }*/

  /*checkChangeAccount(){
    this.accountService.accountChanged.subscribe(
      (event: { previousAccount: Account; currentAccount: Account }) => {
        console.log(event.previousAccount);
        console.log(event.currentAccount);
        console.log(this.accountService.getAccount().language)

        //this.changeLang('nl')
      }
    )
  }*/
}
