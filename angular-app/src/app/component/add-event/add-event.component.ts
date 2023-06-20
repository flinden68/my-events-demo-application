import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventService} from "../../service/event.service";
import {Event} from "../../model/event";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from "../../service/account.service";
import {TranslateService} from "@ngstack/translate";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEventComponent implements OnInit {

  pageTitle: string;
  _id: string;
  private sub: any;
  event: Event;
  submitted = false;
  eventForm: FormGroup;

  constructor(private eventService: EventService,
              private router: Router,
              private formBuilder: FormBuilder,
              private accountService : AccountService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.pageTitle = this.translate.get("title-add-event");
    if(this.accountService.isAuthenticated()){
      this.loadEvent();
    }else{
      this.notAuthenticated();
    }

    /*this._bsDatepickerConfig.dateInputFormat = 'DD-MM-YYYY';
    this._bsDatepickerConfig.containerClass = 'theme-blue';*/

  }

  loadEvent() {
    this.event = new Event();
    this.event.title = '';
      this.event.description = '';
      this.event.location = '';
      this.event.userId = this.accountService.getAccount()._id
      this.event.start = new Date().getTime();
      this.event.end = new Date().getTime()

    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]]
    });
  }

  get form() {
    return this.eventForm.controls;
  }

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

    this.eventService.create(this.event)
      .subscribe(event => {
        this.event = event;
        this.router.navigate(['/events']);
      })
  }

  notAuthenticated(){
    this.router.navigate(['/']);
  }

}
