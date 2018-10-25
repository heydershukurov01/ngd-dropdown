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
      if (value.length && value.length > 0) {
        if (options && options.length && options.length > 0) {
          this.options = options.map(option => {
            Object.assign(option, {visible: true});
            Object.assign(option, {selected: false});
            for (let index = 0; index < value.length; index++) {
              if ( value[index] === option[configs.option.value]) {
                option.selected = true;
                this.values = [...this.values, option];
              }
            }
            return option;
          });
        }
      } else {
        this.options = options.map(option => {
          Object.assign(option, {visible: true});
          Object.assign(option, {selected: false});
          if ( value === option[configs.option.value]) {
            option.selected = true;
            this.values = [...this.values, option];
          }
          return option;
        });
      }
    } else {
      this.options = options.map(option => {
        Object.assign(option, {visible: true});
        Object.assign(option, {selected: false});
        return option;
      });
      this.values = [];
    }
  }
}
