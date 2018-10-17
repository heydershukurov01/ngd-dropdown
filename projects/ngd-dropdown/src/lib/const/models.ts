import * as functions from "./helpers";

export class Option {
  public options: any[] = [];
  public values: any | any[];
  constructor(value: any | any[], options: any[], configs) {
    // functions.filter(value, options, configs.option.value)
    if (this._multiple(configs)) {
      this._setMultiple(value, options);
    } else {

    }
  }
  private _multiple(config) {
    return config.multiple;
  }
  private _setMultiple(values: any[], options: any[]){
    // Get count
    const valueCount = values && values.length ? values.length : 0;
    const optionsCount = options && options.length ? options.length : 0;
    if (optionsCount === 0 && valueCount > 0) {

    }
  }
  private _setSingle(){

  }

}
