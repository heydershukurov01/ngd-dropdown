/**
 Author Heyder Shukurov
 Created 17.05.2018
 */
import * as initial from './const/initial-configs';
import * as model from './const/models';
import {AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {fromEvent} from 'rxjs';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

@Component({
  selector: 'ngd-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: [`./dropdown.component.scss`],
  providers: [customValueProvider],
})
export class DropdownComponent implements DoCheck, ControlValueAccessor, AfterViewInit, OnDestroy {
  private globalClick;
  public toggle = false;
  public globalValue: any = [];
  public localValue: any = [];
  @Input() public configs = initial.InitialConfigs;
  @Input() public options = [];
  @Input() public placeholder: string;
  @Input() public searchPlaceholder: string;
  @ViewChild('dropdown') dropdown: ElementRef;
  public term = '';
  private _searchTimeout: any;
  public selectAllToggle = false;
  // Outputs
  @Output() dropdownToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dropdownOpened: EventEmitter<void> = new EventEmitter<void>();
  @Output() dropdownClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  @Output() unselected: EventEmitter<any> = new EventEmitter<any>();
  @Output() allSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() allUnSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() rawData: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Propogate  changes to value
   */
  public propagateChange: any = () => {};
  public ngAfterViewInit(): void {
    this.globalClick = fromEvent(document, 'click').subscribe((event: MouseEvent) => {
      this._clickOutside(event);
    });
  }

  public ngDoCheck() {
    this._setInitialValue();
  }

  /**
   * Write VALUE
   */
  writeValue(value: any) {
    if ( value ) {
      this.globalValue = value;
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
    setTimeout(() => {
      const reformedValues = new model.Option(this.globalValue, this.options, this.configs);
      this.options = reformedValues.options;
      this.localValue = reformedValues.values;
      this.selectAllToggle = reformedValues.selectedAll;
    });
  }

  /**
   * Toggles Dropdown
   */
  public toggleDropdown(event): void {
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
        this.localValue = this.localValue && this.localValue.length ? [...this.localValue , option ] : [option];
        this._valueProcessor(this.localValue);
        this.selected.emit(option[this.configs.option.value]);
        this._emitRawData('selected', option);
      } else {
        let index: null;
        option.selected = false;
        this.localValue.map((value, i) => {
          if (option[this.configs.option.value] === value[this.configs.option.value]) {
            index = i;
          }
        });
        this.unselect(index);
      }
    } else {
      if (!option.selected) {
        this.localValue = option;
        this._emitRawData('selected', option);
        option.selected = true;
        this.options = this.options.map( item => {
          item.selected = item[this.configs.option.value] === option[this.configs.option.value];
          return item;
        });
        this.term = '';
        this.searched();
        this._valueProcessor(this.localValue);
        this.selected.emit(option[this.configs.option.value]);
      } else {
        this.localValue = null;
        this._emitRawData('unselected', option);
        this.options = this.options.map( item => {
          item.selected = false;
          return item;
        });
        option.selected = false;
        this._valueProcessor(null);
        this.selected.emit(option[this.configs.option.value]);
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
        if (option[this.configs.option.value] === this.localValue[index][this.configs.option.value]) {
          option.selected = false;
          this.unselected.emit(option[this.configs.option.value]);
          this._emitRawData('unselected', option);
        }
        return option;
      });
      this.localValue.splice(index, 1);
      if (!this.localValue || this.localValue.length === 0) {
        this._valueProcessor([]);
      } else {
        this._valueProcessor(this.localValue);
      }
    } else {
      this.unselected.emit(this.localValue[this.configs.option.value]);
      this._emitRawData('unselected', this.localValue);
      this.localValue = null;
      this._valueProcessor(null);
    }
  }

  public searched() {
    if (this.configs.jsSearch) {
      this.options = this.options.map(option => {
        if (option[this.configs.option.name].indexOf(this.term) !== -1) {
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
    setTimeout(() => {
      let payloadData: any;
      if (this.configs.multiple) {
        payloadData = [];
        this.options.forEach(option => {
          const data = Object.assign({}, option);
          if (data.selected) {
            delete data.visible;
            delete data.selected;
            payloadData = [...payloadData, data];
          }
        });
      } else {
        payloadData = Object.assign({}, payload);
        delete payloadData.visible;
        delete payloadData.selected;
      }
      this.rawData.emit({action, payloadData});
    }, 10);
  }

  /**
   * Process value
   * value
   * {any}
   * private
   */
  private _valueProcessor(values) {
    if (values) {
      this.globalValue = this.configs.multiple ? values.map(
        value => {
          if (value && value[this.configs.option.value]) {
            return value[this.configs.option.value];
          }
          return null;
        }
      ) : values[this.configs.option.value];
    } else {
      this.globalValue = null;
    }
    this.propagateChange(this.globalValue);
  }

  /**
   * Select all
   */
  public selectAllData() {
    this.selectAllToggle = !this.selectAllToggle;
    this.options = this.options.map(
      option => {
        option.selected = this.selectAllToggle;
        return option;
      }
    );
    this.localValue =  this.selectAllToggle ? this.options : [];
    if (this.selectAllToggle) {
      const payloadData: {visible?: boolean, selected?: boolean} = Object.assign({}, this.localValue);
      delete payloadData.visible;
      delete payloadData.selected;
      this.allSelected.emit(payloadData);
    } else {
      this.allSelected.emit([]);
    }
    this._valueProcessor(this.localValue);
    this._emitRawData(this.selectAllToggle ? 'allSelected' : 'allUnSelected', this.localValue);
  }
  private _clickOutside(event) {
    const box = this.dropdown.nativeElement;
    if (!this._isDescendant(box, event.target)) {
      this.closeDropdown();
    }
  }
  private _isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }
  ngOnDestroy(): void {
    if (!this.globalClick) {
      this.globalClick.unsubscribe();
    }
  }
}
