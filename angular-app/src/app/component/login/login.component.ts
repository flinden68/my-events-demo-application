import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from "../../service/account.service";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../model/account';
import {TranslateService} from "@ngstack/translate";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  pageTitle: string;
  submitted:boolean = false;
  loginForm: FormGroup;
  account : Account;
  showRegister : boolean = false;
  debug: boolean = false;

  constructor(private accountService: AccountService,
              private router: Router,
              private formBuilder: FormBuilder,
              private translate: TranslateService) { }

  ngOnInit() {
    this.pageTitle = this.translate.get("title-login");
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      accessCode: ['', Validators.required]
    });

    this.account = new Account();
    this.account.email = '';
    this.account._id = '';
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.account._id = this.loginForm.value.accessCode;
    this.account.email = this.loginForm.value.email;

    this.accountService.fetch(this.account)
      .subscribe(account => {
        if(account == null){
          this.showRegister = true;
        }else{
          this.showRegister = false;
          this.accountService.activeAccount = account;
          this.router.navigate(['/events']);
        }
        //
      })
  }

  public setLanguage(language : string){
    this.translate.activeLang = language;
  }

}
