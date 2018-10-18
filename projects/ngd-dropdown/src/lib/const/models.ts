import * as functions from "./helpers";

export class Option {
  /**
   * Options
   * {any[]}
   */
  public options: any[] = [];
  /**
   * Values
   */
  public values: any | any[];
  constructor(value: any | any[], options: any[], configs) {
    if (this._isMultiple(configs)) {
      value = this._activateValues(value);
      this._setMultiple(value, options, configs.option.value);
    } else {
      this._setSingle(value, options, configs.option.value)
    }
  }

  /**
   * Check if velues multiple
   * config
   * {any}
   */
  private _isMultiple(config) {
    return config.multiple;
  }

  /**
   * Set Options for multiple
   * {any[]} values
   * {any[]} options
   * {string} prop
   */
  private _setMultiple(values: any[], options: any[], prop: string){
    // Get count
    const valueCount = values && values.length ? values.length : 0;
    const optionsCount = options && options.length ? options.length : 0;
    if(optionsCount > 0 && valueCount > 0) {
      options = [...options, ...values];
      options = functions.unique(options, prop);
      // TODO: Simplify this
      options = options.map(option => {
        if (typeof option.visible === 'undefined') {
          option.visible = true;
        }
        values.forEach( value => {
          if (value[prop] === option[prop]) {
            option.selected = true;
          }
        })
        return option;
      })
    } else if(optionsCount > 0 && valueCount === 0) {
      options = options.map(option => {
        if (typeof option.visible === 'undefined') {
          option.visible = true;
        }
        return option;
      });
    }
    this.options = options;
    this.values = values;
  }

  /**
   * Set Options for single
   * {any[]} values
   * {any[]} options
   * {string} prop
   */
  private _setSingle(value: any[], options: any[], prop: string){
    const optionsCount = options && options.length ? options.length : 0;
    options = [value, ...options];
    if(optionsCount > 0) {
      options = functions.unique(options, prop)
    }
    this.options = options;
    this.values = value;
  }
  // Helpers
  private _activateValues(values): any[] | any {
    if (values && values.length && values.length > 0) {
      values = values.map(value => {value.selected = true; return value});
    }
    return values;
  }

}
