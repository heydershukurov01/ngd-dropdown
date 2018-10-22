/**
 Author Heyder Shukurov
 Created 17.05.2018
 */
import * as initial from './const/initial-configs';
import * as model from './const/models';
import {Component, DoCheck, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgdDropdownComponent),
  multi: true
};

@Component({
  selector: 'ngd-dropdown',
  templateUrl: './ngd-dropdown.component.html',
  styleUrls: [`./ngd-dropdown.component.css`],
  providers: [customValueProvider],
})
export class NgdDropdownComponent implements DoCheck, ControlValueAccessor {
  public toggle = false;
  @Input() public configs = initial.InitialConfigs;
  @Input() public options = [];
  @Input() public fgroup: FormGroup;
  @Input() public name: string;
  @Input() public options = [];
  private _valueData: any;
  private _searchTimeout: any;
  public term = '';
  /**
   * Get value
   * {any[] | any}
   */
  @Input()
  get value() {
    return this._valueData;
  }

  /**
   * Emit value
   * {EventEmitter<any[] | any>}
   */
  @Output() valueChange: EventEmitter<any | any[]> = new EventEmitter<any | any[]>();
  set value(value) {
    this._valueData = value;
    this.valueChange.emit(this._valueData);
    this.propagateChange(value);
  }
  // Outputs
  @Output() dropdownToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dropdownOpened: EventEmitter<void> = new EventEmitter<void>();
  @Output() dropdownClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  @Output() unselected: EventEmitter<any> = new EventEmitter<any>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() rawData: EventEmitter<any> = new EventEmitter<any>();
  public propagateChange: any = () => {};
  public ngDoCheck() {
    this._setInitialValue();
  }

  /**
   * Write VALUE
   */
  writeValue(value: any) {
    if ( value ) {
      this.value = value;
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

  private _setInitialValue() {
    const reformedValues = new model.Option(this.value, this.options, this.configs);
    this.options = reformedValues.options;
  }

  /**
   * Toggles Dropdown
   */
  public toggleDropdown(): void {
    this.toggle = !this.toggle;
    if (this.toggle) {
      this.dropdownOpened.emit();
      this.dropdownToggle.emit(true);
    } else {
      this.dropdownClosed.emit();
      this.dropdownToggle.emit(false);
    }
  }

  /**
   * Close Dropdown
   */
  public closeDropdown(): void {
    this.toggle = false;
    this.dropdownClosed.emit();
    this.dropdownToggle.emit(false);
  }

  /**
   * Options Selected
   */
  public optionSelected(option: any): void {
    if (this.configs.multiple) {
      if (!option.selected) {
        this.selected.emit(option[this.configs.option.value]);
        this._emitRawData('selected', option);
        this.value = this.value && this.value.length ? [...this.value , option ] : [option];
      } else {
        let index: null;
        option.selected = false;
        this.value.map((value, i) => {
          if (option[this.configs.option.value] === value[this.configs.option.value]) {
            index = i;
          }
        });
        this.unselect(index);
      }
    } else {
      if (!option.selected) {
        this.value = option;
        this.selected.emit(option[this.configs.option.value]);
        this._emitRawData('selected', option);
        option.selected = true;
        this.options = this.options.map( item => {
          item.selected = item[this.configs.option.value] === option[this.configs.option.value];
          return item;
        });
      } else {
        this.value = null;
        this.selected.emit(option[this.configs.option.value]);
        this._emitRawData('unselected', option);
        this.options = this.options.map( item => {
          item.selected = false;
          return item;
        });
        option.selected = false;
      }
    }
  }

  /**
   * Unselect data from selected values
   * {number} index
   */
  public unselect(index: number = null): void {
    if (this.configs.multiple) {
      this.options = this.options.map(option => {
        if (option[this.configs.option.value] === this.value[index][this.configs.option.value]) {
          option.selected = false;
          this.unselected.emit(option[this.configs.option.value]);
          this._emitRawData('unselected', option);
        }
        return option;
      });
      this.value.splice(index, 1);
      if (!this.value || this.value.length === 0) {
        this.propagateChange(null);
      }
    } else {
      this.unselected.emit(this.value[this.configs.option.value]);
      this._emitRawData('unselected', this.value);
      this.value = null;
      this.propagateChange(null);
    }
  }

  public searched() {
    if (this.configs.jsSearch) {
      this.options = this.options.map(option => {
        if (option[this.configs.option.name].indexOf(this.term) > -1) {
          option['visible'] = true;
        } else {
          option['visible'] = false;
        }
        return option;
      });
    }
    if (this.configs.serverSearch) {
      clearTimeout(this._searchTimeout);
      this._searchTimeout = setTimeout(() => {
        this.search.emit(this.term);
      }, this.configs.searchTimeout);
    }
  }

  /**
   * Emit Raw Data
   * {string} action
   * payload
   */
  private _emitRawData(action: string, payload: any) {
    const payloadData = Object.assign({}, payload);
    delete payloadData['visible'];
    delete payloadData['selected'];
    this.rawData.emit({action, payloadData});
  }
}
