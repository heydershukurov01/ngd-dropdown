import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgdDropdownModule} from '../../projects/ngd-dropdown/src/lib/ngd-dropdown.module';
import {FormsModule} from '@angular/forms';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgdDropdownModule,
    FormsModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
