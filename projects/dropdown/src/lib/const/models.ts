export class Option {
  /**
   * Options
   * {any[]}
   */
  public options: any[] = [];
  public values: any[] = [];
  public selectedAll = false;
  constructor(value: any | any[], options: any[], configs) {
    this._selectCandidates(value, options, configs);
    this.selectedAll = this.values.length === this.options.length;
  }
  private _selectCandidates(value, options, configs) {
    this.values = [];
    if (value) {
      if (value.length && Array.isArray(value)) {
        if (options && options.length && options.length > 0) {
          this.options = options.map(option => {
            Object.assign(option, {visible: typeof option.visible === 'undefined' ? true : typeof option.visible === 'boolean' && option.visible});
            Object.assign(option, {selected: false});
            for (let index = 0; index < value.length; index++) {
              if ( String(value[index]) === String(option[configs.option.value])) {
                option.selected = true;
                this.values = [...this.values, option];
              }
            }
            return option;
          });
        }
      } else {
        this.options = options.map(option => {
          Object.assign(option, {visible: typeof option.visible === 'undefined' ? true : typeof option.visible === 'boolean' && option.visible});
          Object.assign(option, {selected: false});
          if ( String(value) === String(option[configs.option.value])) {
            option.selected = true;
            this.values = [...this.values, option];
          }
          return option;
        });
      }
    } else {
      this.options = options.map(option => {
        Object.assign(option, {visible: typeof option.visible === 'undefined' ? true : typeof option.visible === 'boolean' && option.visible});
        Object.assign(option, {selected: false});
        return option;
      });
      this.values = [];
    }
  }
}
