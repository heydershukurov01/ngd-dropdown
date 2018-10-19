/**
 Author Heyder Shukurov
 Created 17.05.2018
 */
import * as core from '@angular/core';
import * as initial from './const/initial-configs';
import * as model from './const/models';
@core.Component({
  selector: 'ngd-dropdown',
  templateUrl: './ngd-dropdown.component.html',
  styleUrls: [`./ngd-dropdown.component.css`],
})
export class NgdDropdownComponent implements core.DoCheck {
  public toggle = false;
  @core.Input() public configs = initial.InitialConfigs;
  @core.Input() public options = [];
  private _valueData: any;
  private _searchTimeout: any;
  public term = '';
  /**
   * Get value
   * {any[] | any}
   */
  @core.Input()
  get value() {
    return this._valueData;
  }

  /**
   * Emit value
   * {EventEmitter<any[] | any>}
   */
  @core.Output() valueChange: core.EventEmitter<any | any[]> = new core.EventEmitter<any | any[]>();
  set value(value) {
    this._valueData = value;
    this.valueChange.emit(this._valueData);
  }
  // Outputs
  @core.Output() dropdownToggle: core.EventEmitter<boolean> = new core.EventEmitter<boolean>();
  @core.Output() dropdownOpened: core.EventEmitter<void> = new core.EventEmitter<void>();
  @core.Output() dropdownClosed: core.EventEmitter<void> = new core.EventEmitter<void>();
  @core.Output() selected: core.EventEmitter<any> = new core.EventEmitter<any>();
  @core.Output() unselected: core.EventEmitter<any> = new core.EventEmitter<any>();
  @core.Output() search: core.EventEmitter<string> = new core.EventEmitter<string>();
  @core.Output() rawData: core.EventEmitter<any> = new core.EventEmitter<any>();

  public ngDoCheck() {
    this._setInitialValue();
  }

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
      this.dropdownOpened.emit()
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
    this.dropdownClosed.emit()
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
        })
        this.unselect(index);
      }
    } else {
      this.value = option;
    };
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
    } else {
      this.unselected.emit(this.value[this.configs.option.value]);
      this._emitRawData('unselected', this.value);
      this.value = null;
    }
  }

  public searched() {
    if (this.configs.jsSearch) {
      this.options = this.options.map(option => {
        if (option[this.configs.option.name].indexOf(this.term) > -1) {
          option.visible = true;
        } else {
          option.visible = false;
        }
        return option
      })
    }
    if (this.configs.serverSearch) {
      clearTimeout(this._searchTimeout);
      this._searchTimeout = setTimeout(() => {
        this.search.emit(this.term);
      }, this.configs.searchTimeout)
    }
  }

  /**
   * Emit Raw Data
   * {string} action
   * payload
   */
  private _emitRawData(action: string, payload: any) {
    const payloadData = Object.assign({}, payload);
    delete payloadData.visible;
    delete payloadData.selected;
    this.rawData.emit({action, payloadData});
  }
}
