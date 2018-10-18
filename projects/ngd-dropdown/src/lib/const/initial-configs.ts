export interface NgdDropdownConfigs {
  theme: 'default',
  placeholder: string,
  multiple: boolean,
  jsSearch: boolean,
  serverSearch: boolean,
  searchTimeout: number,
  option: {
    name: string,
    value: string
  }
}


export const InitialConfigs: NgdDropdownConfigs = {
  theme: 'default',
  placeholder: 'Select',
  multiple: true,
  jsSearch: true,
  serverSearch: true,
  searchTimeout: 200,
  option: {
    name: 'title',
    value: 'title'
  }
};
