import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {EventlistComponent} from "./component/eventlist/eventlist.component";
import {AddEventComponent} from "./component/add-event/add-event.component";
import {EditEventComponent} from "./component/edit-event/edit-event.component";
import {LoginComponent} from "./component/login/login.component";
import {AccountComponent} from "./component/account/account.component";
import {RegisterComponent} from "./component/register/register.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventlistComponent },
  { path: 'event/add', component: AddEventComponent },
  { path: 'event/:id', component: EditEventComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
