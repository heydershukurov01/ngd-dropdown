import { Component } from '@angular/core';
import {NgdDropdownConfigs} from '../../projects/dropdown/src/lib/const/initial-configs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public configs: NgdDropdownConfigs = {
    theme: 'default',
    placeholder: 'Select item',
    noData: 'No data was found!',
    selectAll: false,
    selectAllText: 'Select all',
    multiple: false,
    jsSearch: true,
    serverSearch: true,
    searchTimeout: 200,
    option: {
      name: 'text',
      value: 'id'
    }
  };
  value;
  options = [];
  constructor() {
    setTimeout(() => {
      this.options = [
        {id: 1, text: '1 in texti'},
        {id: 2, text: '2 in texti'},
        {id: 3, text: '3 in texti'},
        {id: 4, text: '4 in texti'},
      ];
    }, 2000);

    setTimeout(() => {
      this.value = '4';
      console.log('Secilmeli idi');
    }, 5000);

  }
}
