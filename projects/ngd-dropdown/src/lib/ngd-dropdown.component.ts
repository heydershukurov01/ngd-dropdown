import {ClickOutsideModule} from 'ng-click-outside';

/**
 Author Heyder Shukurov
 Created 17.05.2018
 */
const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgdDropdownComponent),
  multi: true
};
import {
  Component, forwardRef, Input,
  OnInit,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
@Component({
  selector: 'lib-ngd-dropdown',
  templateUrl: './ngd-dropdown.component.html',
  styleUrls: [`./icons/css/material-design-iconic-font.min.css`, `./ngd-dropdown.component.css`],
  providers: [customValueProvider],
})
export class NgdDropdownComponent implements  ControlValueAccessor {
  constructor() {}
  toggle = false;
  options = {
    theme: 'default',
  }
  /**
   * Main Data from Outside
   * Value accessor
   */
  _value = '';
  propagateChange: any = () => {};
  /**
   * Write VALUE
   */
  writeValue(value: any) {
    if ( value ) {
      this._value = value;
    }
  }

  /**
   * Register On Change of value
   */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  /**
   * Trigger on Touched
   */
  registerOnTouched(fn: () => void): void { }

  /**
   * Update Value
   */
  onChange(event) {
    this.propagateChange(event.target.value);
  }

  /**
   * Toggles Dropdown
   */
  toggleDropdown(): void {
    this.toggle = !this.toggle;
  }

  /**
   * Close Dropdown
   */
  closeDropdown(): void {
    this.toggle = false;
  }
}
