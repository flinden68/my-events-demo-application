import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";
import {AccountService} from "../../service/account.service";
import {Router} from '@angular/router';
import {Payload} from "../../model/payload";
import {CalendarService} from "../../service/calendar.service";
import {FileSaverService} from "ngx-filesaver";
//import saveAs from 'file-saver';

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
              private accountService : AccountService,
              private calendarService : CalendarService,
              private _FileSaverService: FileSaverService) { }

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

  getDomain(){
    let email = this.accountService.getAccount().email;
    let domain = email.substring(email.indexOf("@") + 1, email.length);
    return domain;
  }

  getTimezone(){
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone;
  }

  exportEvents(){
    let organizer = this.accountService.getAccount().name + " <" + this.accountService.getAccount().email + ">";
      let domain = this.getDomain();
      let timezone = this.getTimezone();

    let payload = new Payload(organizer, domain, timezone);
    payload.setEvents(this.events);

    this.calendarService.createIcal(payload).subscribe(response => {
      this._FileSaverService.save((<any>response), "calendar.ics");
    })

  }

}
