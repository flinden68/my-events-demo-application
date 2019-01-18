import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventlistComponent implements OnInit {

  private events : Event[];

  constructor(private eventService : EventService) { }

  ngOnInit() {
    this.loadEvents()
  }

  public loadEvents(){
    this.eventService.fetchaAllEventsByUserId("5be564d50f085f2cc19e3fef")
      .subscribe( events => this.events = events);
  }

}
