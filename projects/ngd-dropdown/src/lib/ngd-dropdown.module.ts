import { NgModule } from '@angular/core';
import { NgdDropdownComponent } from './ngd-dropdown.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NgdDropdownComponent],
  exports: [NgdDropdownComponent]
})
export class NgdDropdownModule { }
