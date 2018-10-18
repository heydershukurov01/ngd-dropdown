# NGD-DROPDOWN
**NGD-DROPDOWN** is an Angular library for multiselectable and singleselectable dropdown component. The goal is to create a simple core library that makes option selection process nice and easy.

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
        placeholder: 'Placeholder',
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
    {test: 'Text 1', id: 1},
    {test: 'Text 2', id: 2},
    {test: 'Text 3', id: 3},
  ]
  
  public value: any;
}
```
in yout template.html file
```angular2html
<ngd-dropdown [options]="options" [(value)]="value" [configs]="configs"></ngd-dropdown>
```
## Inputs
### Configurations [configs]
The configurations are for customization. All the default values are provided. See table below to be able to correctly configure component 

| property              | type                            |  default                        | description                                                                                                         |
| --------------------- | ------------------------------- |  ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `theme`               | `default`                       |  'default'                      | Component theme;                                                                                                    |
| `placeholder`         | `string`                        |  ' '                            | The placeholder will be displayed on the selectbox area, if there is not any value selected or provided to display; |
| `multiple`            | `boolean`                       |  `false`                        | If multiple selection required or not                                                                               |
| `jsSearch`            | `boolean`                       |  `false`                        | Activates client side search mechanism                                                                              |
| `serverSearch`        | `boolean`                       |  `false`                        | Use for server side search                                                                                          |
| `searchTimeout`       | `number`                        |  `0`                            | if `serverSearch` is true will emit search term after given time                                                    |
| `option`              | `{name: string, value: string}` |  `{name: 'text', value: 'id'}`  | `name` will be used as option name `value` will be used as value of the option                                      |                                                  |

### Options [options]
  type: `any[]` \
  default: `[]` \
  description: `The array of options [reactive]. Will be displayed as selectable options in the dropdown`
### Value [(value)]
 type: `any | any[]` \
 default: `null`  \
 description: `Two way data binded value of select object. If multiple selection enabled value will be array else will be object`

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
   
### Selected (selected)
  type: `any` \
  description: `This event triggers when option is selected and emits the value of selected object`

### Unselected (unselected)
  type: `any` \
  description: `This event triggers when option is deselected and emits the value of deselected object`

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

