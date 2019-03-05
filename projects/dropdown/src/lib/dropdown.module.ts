import { NgModule } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DropdownComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DropdownComponent]
})
export class DropdownModule { }
