import { NgModule } from '@angular/core';
import { NgdDropdownComponent } from './ngd-dropdown.component';
import {FormsModule} from '@angular/forms';
import {ClickOutsideModule} from 'ng-click-outside';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideModule
  ],
  declarations: [NgdDropdownComponent],
  exports: [NgdDropdownComponent]
})
export class NgdDropdownModule { }
