import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";
import {AccountService} from "../../service/account.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventlistComponent implements OnInit {

  private events : Event[];

  constructor(private eventService : EventService,
              private router: Router,
              private accountService : AccountService) { }

  ngOnInit() {
    if(this.accountService.isAuthenticated()){
      this.loadEvents();
    }else{
      this.notAuthenticated();
    }
  }

  public loadEvents(){
    if(this.accountService.getAccount()) {
      this.eventService.fetchaAllEventsByUserId(this.accountService.getAccount()._id)
        .subscribe(events => this.events = events);
    }
  }

  notAuthenticated(){
    this.router.navigate(['/']);
  }

}
