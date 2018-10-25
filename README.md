# NGD-DROPDOWN
**NGD-DROPDOWN** is an Angular library for multiselectable and singleselectable dropdown component. The goal is to create a simple core library that makes option selection process nice and easy.

## Current Version (0.2.0)
Changelog
  - Select all button
  - Now only selected option's value is emitted (before it was selected object)
  - New configs (checkout for more)
  - New Outputs
  - Minor Bug Fixes
  - Performance upgrade
  
## Current Version (0.1.0)
Changelog
  - Support for Angular version 7
  - Support for Reactive Forms
  - Support for [(ngModel)] 2 way data binding
  - Minor Bug Fixes
  - Huge Performance upgrade

## Install

#### [npm](https://www.npmjs.com/package/ngd-dropdown)
```
npm install ngd-dropdown --save 
```

## Usage
Dropdown selector is easy to integrate
In your app.module.ts (bootstrap module)
```
import {NgdDropdownModule} from 'ngd-dropdown';
```
```
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgdDropdownModule
  ]
})
```
in your component.ts file
```angular2html
import {NgdDropdownConfigs} from "../ngd-dropdown";
...
@Component({
    selector: 'desired-components',
    template: './desired-component.component.html'  
})
export class DesireComponent {
  public configs: NgdDropdownConfigs = {
        theme: 'default',
        placeholder: 'Select item',
        noData: 'No data was found!',
        selectAll: true,
        selectAllText: 'Select all',
        multiple: true,
        jsSearch: true,
        serverSearch: true,
        searchTimeout: 200,
        option: {
          name: 'text',
          value: 'id'
        }
  }
  
  public options: any[] = [
    {text: 'Text 1', id: 1},
    {text: 'Text 2', id: 2},
    {text: 'Text 3', id: 3},
  ]
  
  public value: any;
}
```
in yout template.html file
```angular2html
<ngd-dropdown [options]="options" [(ngModel)]="value" [configs]="configs"></ngd-dropdown>
```
## Inputs
### Configurations [configs]
The configurations are for customization. All the default values are provided. See table below to be able to correctly configure component 

| property              | type                            |  default                        | description                                                                                                         |
| --------------------- | ------------------------------- |  ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `theme`               | `default`                       |  'default'                      | Component theme;                                                                                                    |
| `placeholder`         | `string`                        |  'Select item'                  | The placeholder will be displayed on the selectbox area, if there is not any value selected or provided to display; |
| `noData`              | `string`                        |  'No data was found!'           | Message will be shown if no option provided to display;                                                             |
| `selectAll`           | `boolean`                       |  'false'                        | Select all button will be displayed;                                                                                  |
| `selectAllText`       | `boolean`                       |  'false'                        | Select all button text;                                                                                             |
| `multiple`            | `boolean`                       |  `false`                        | If multiple selection required or not                                                                               |
| `jsSearch`            | `boolean`                       |  `false`                        | Activates client side search mechanism                                                                              |
| `serverSearch`        | `boolean`                       |  `false`                        | Use for server side search                                                                                          |
| `searchTimeout`       | `number`                        |  `0`                            | if `serverSearch` is true will emit search term after given time                                                    |
| `option`              | `{name: string, value: string}` |  `{name: 'text', value: 'id'}`  | `name` will be used as option name `value` will be used as value of the option                                      |                                                  |

### Options [options]
  type: `any[]` \
  default: `[]` \
  description: `The array of options [reactive]. Will be displayed as selectable options in the dropdown`
### Value [(ngModel)]
 type: `any | any[]` \
 default: `null`  \
 description: `Two way data binded value of select object. If multiple selection enabled value will be array else will be string or number`

## Outputs
### Dropdown Opened (dropdownOpened)
   type: `void` \
   description: `This event only triggers when dropdown is opened`
### Dropdown Closed (dropdownClosed)
   type: `void` \
   description: `This event only triggers when dropdown is closed`
### Dropdown Toggle (dropdownToggle)
   type: `boolean` \
   description: `This event triggers when dropdown is both closed and opened. If dropdown opened the true value will be emitted. If dropdown closed the false value will be emitted`
### Selected (selected)
   type: `any` \
   description: `This event triggers when option is selected and emits the value of selected object`
### Unselected (unselected)
  type: `any` \
  description: `This event triggers when option is deselected and emits the value of deselected object`
### AllSelected (allSelected)
   type: `any` \
   description: `This event triggers whenSelect all button clicked and all the options were selected`
### All Unselected (allUnselected)
  type: `any` \
  description: `This event triggers when select all button clicked and all the previously selected options were deselected`
### Search (search)
  type: `string` \
  description: `This event triggers when server side search is enabled and emits search term of search box`
### Raw Data (rawData)
  type: `{action: string, payload: any}` \
  description: `This event triggers when selected and unselected option. But the tricky part is it emits both action and raw data of selected object`

## Support
Tested in Chrome , Firefox , IE 9-11 , Edge , Safari

## Copyright
Copyright © 2018

