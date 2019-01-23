import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from "../../service/account.service";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../model/account';
import {TranslateService} from "@ngstack/translate";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

  pageTitle: string;
  submitted = false;
  accountForm: FormGroup;
  accessCode: string;
  debug: boolean = true;

  constructor(private accountService: AccountService,
              private router: Router,
              private formBuilder: FormBuilder,
              private translate: TranslateService) { }

  ngOnInit() {
    this.pageTitle = this.translate.get("title-account");
    if(this.accountService.isAuthenticated()){
      this.accountForm = this.formBuilder.group({
        email: [this.accountService.getAccount().email, [Validators.required, Validators.email]],
        language: [this.accountService.getAccount().language, Validators.required],
        name: [this.accountService.getAccount().name, Validators.required]
      });
      this.accessCode = this.accountService.getAccount()._id;

    }else{
      this.notAuthenticated();
    }
  }

  get form() {
    return this.accountForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.accountForm.invalid) {
      return;
    }

    let account = new Account();
    account._id = this.accessCode;
    account.email = this.accountForm.value.email;
    account.language = this.accountForm.value.language;
    account.name = this.accountForm.value.name;

    this.accountService.update(account._id, account)
      .subscribe(account => {
          if(account){
            this.accountService.activeAccount = account;
            this.router.navigate(['/events']);
          }
      })
  }

  notAuthenticated(){
    this.router.navigate(['/']);
  }

}
