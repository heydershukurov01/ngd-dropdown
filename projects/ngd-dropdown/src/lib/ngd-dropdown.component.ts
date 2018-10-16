import {ClickOutsideModule} from 'ng-click-outside';

/**
 Author Heyder Shukurov
 Created 17.05.2018
 */
import * as core from '@angular/core';
import * as initial from './const/initial-configs';
@core.Component({
  selector: 'lib-ngd-dropdown',
  templateUrl: './ngd-dropdown.component.html',
  styleUrls: [`./icons/css/material-design-iconic-font.min.css`, `./ngd-dropdown.component.css`],
})
export class NgdDropdownComponent {
  toggle = false;
  @core.Input() configs = initial.InitialConfigs;
  @core.Input() options = [];
  valueData: any;
  values: any[] = [];
  constructor() {}

  /**
   * Get options
   * {any[]}
   */
  @core.Input()
  get value() {
    return this.valueData;
  }

  /**
   * Emit options
   * {EventEmitter<any>}
   */
  @core.Output() valueChange: core.EventEmitter<any> = new core.EventEmitter<any>();
  set value(value) {
    this.valueData = value;
    this.valueChange.emit(this.valueData);
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

  /**
   * Options Selected
   */
  optionSelected(option: any): void {
    let value = null;
    if (this.configs.option.value) {
      value = option[this.configs.option.value];
    } else {
      value = option;
    }
    this.setSelected(value);
  }

  /**
   * Set Selected Value
   * {Object | number | string} value
   */
  setSelected(value: Object | number | string): void {
    if (this.configs.multiple) {
      this.values = [...this.values , value ];
      this.value = this.values;
    } else {
      this.values = [value];
      this.value = value;
    }
  }

  /**
   * Unselect data from selected values
   * {number} index
   */
  unselect(index: number): void {
    this.values.splice(index, 1);
    this.value = this.configs.multiple ? this.values : null;
  }
}
