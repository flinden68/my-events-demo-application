import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AccountService} from "../../service/account.service";
import {TranslateService} from "@ngstack/translate";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditEventComponent implements OnInit {
  pageTitle: string;
  _id: string;
  private sub: any;
  event : Event;
  submitted = false;
  eventForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private eventService : EventService,
              private router: Router,
              private formBuilder: FormBuilder,
              private accountService : AccountService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.pageTitle = this.translate.get("title-edit-event");
    if(this.accountService.isAuthenticated()) {
      this.sub = this.route.params.subscribe(params => {
        this._id = params['id'];
        this.loadEvent();
      });
    }else{
      this.notAuthenticated();
    }

  }

  loadEvent(){
    this.eventService.fetchById(this._id)
      .subscribe( event => {
        this.event = event;

        this.eventForm = this.formBuilder.group({
          title: [this.event.title, Validators.required],
          description: [this.event.description, Validators.required],
          location: [this.event.location, [Validators.required]],
          startDate: [new Date(this.event.start), [Validators.required]],
          endDate: [new Date(this.event.end), [Validators.required]]
        });
      });
  }

  get form() { return this.eventForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.eventForm.invalid) {
      return;
    }

    this.event.end = this.eventForm.value.endDate.getTime();
    this.event.start = this.eventForm.value.startDate.getTime();
    this.event.location = this.eventForm.value.location;
    this.event.description = this.eventForm.value.description;
    this.event.title = this.eventForm.value.title;

    this.eventService.update(this.event._id, this.event)
      .subscribe( event => {
        this.event = event;
        this.router.navigate(['/events']);
        })
  }

  notAuthenticated(){
    this.router.navigate(['/']);
  }

}
