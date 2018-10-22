import { NgModule } from '@angular/core';
import { NgdDropdownComponent } from './ngd-dropdown.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NgdDropdownComponent],
  exports: [NgdDropdownComponent]
})
export class NgdDropdownModule { }
