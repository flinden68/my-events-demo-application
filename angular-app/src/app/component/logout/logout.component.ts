import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from "../../service/account.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private accountService : AccountService) { }

  ngOnInit() {
    this.accountService.logout();
    this.notAuthenticated();
  }

  notAuthenticated(){
    this.router.navigate(['/']);
  }

}
