import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventlistComponent } from './component/eventlist/eventlist.component';
import { LoginComponent } from './component/login/login.component';
import { EditEventComponent } from './component/edit-event/edit-event.component';
import { AddEventComponent } from './component/add-event/add-event.component';
import { AccountComponent } from './component/account/account.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LogoutComponent } from './component/logout/logout.component';
import { FileSaverModule } from 'ngx-filesaver';
import { TranslateModule, TranslateService } from '@ngstack/translate';

// needed to load translation before application starts
export function setupTranslateService(service: TranslateService) {
  return () => service.load();
}

@NgModule({
  declarations: [
    AppComponent,
    EventlistComponent,
    LoginComponent,
    EditEventComponent,
    AddEventComponent,
    AccountComponent,
    RegisterComponent,
    HomeComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    FileSaverModule,
    TranslateModule.forRoot({
      disableCache: true,
      debugMode: false,
      activeLang: 'en'
    })
  ],
  providers: [HttpClientModule, {
    provide: APP_INITIALIZER,
    useFactory: setupTranslateService,
    deps: [TranslateService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
