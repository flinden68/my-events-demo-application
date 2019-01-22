import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from "../../service/account.service";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../model/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  pageTitle: string = "Register"
  submitted = false;
  registerForm: FormGroup;
  account : Account;
  debug: boolean = true;

  constructor(private accountService: AccountService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      language: ['en', Validators.required],
      name: ['', Validators.required]
    });

    this.account = new Account();
    this.account.email = '';
    this.account._id = '';
    this.account.language = 'en';
    this.account.name = '';
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.account._id = this.registerForm.value.accessCode;
    this.account.email = this.registerForm.value.email;
    this.account.language = this.registerForm.value.language;
    this.account.name = this.registerForm.value.name;

    this.accountService.create(this.account)
      .subscribe(account => {
        if(account){
          this.router.navigate(['/account']);
        }
        //
      })
  }

}
