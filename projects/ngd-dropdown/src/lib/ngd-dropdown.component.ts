/**
 Author Heyder Shukurov
 Created 17.05.2018
 */
import * as core      from '@angular/core';
import * as initial   from './const/initial-configs';
import * as helpers from "./const/helpers";
@core.Component({
  selector: 'lib-ngd-dropdown',
  templateUrl: './ngd-dropdown.component.html',
  styleUrls: [`./icons/css/material-design-iconic-font.min.css`, `./ngd-dropdown.component.css`],
})
export class NgdDropdownComponent implements core.OnInit, core.OnChanges {
  public toggle = false;
  @core.Input() public configs = initial.InitialConfigs;
  @core.Input() public options = [];
  private _valueData: any;
  /**
   * Get options
   * {any[]}
   */
  @core.Input()
  get value() {
    return this._valueData;
  }

  /**
   * Emit options
   * {EventEmitter<any>}
   */
  @core.Output() valueChange: core.EventEmitter<any> = new core.EventEmitter<any>();
  set value(value) {
    this._valueData = value;
    this.valueChange.emit(this._valueData);
  }

  constructor() {}

  ngOnInit() {
    this._setInitialValue()
  }
  ngOnChanges() {
    this._setInitialValue()
  }

  private _setInitialValue() {
    if (this.configs.multiple) {

    } else {

    }
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
  optionSelected(option: any, index: number): void {
    if (this.configs.multiple) {
      this.value = this.value && this.value.length ? [...this.value , option ] : [option];
    } else {
      this.value = option;
    };
  }

  /**
   * Unselect data from selected values
   * {number} index
   */
  unselect(index: number = null): void {
    if (this.configs.multiple) {
      this.value.splice(index, 1);
    } else {
      this.value = null;
    }
  }
}
