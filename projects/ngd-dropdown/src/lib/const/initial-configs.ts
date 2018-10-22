export interface NgdDropdownConfigs {
  theme: 'default';
  placeholder: string;
  multiple: boolean;
  jsSearch: boolean;
  serverSearch: boolean;
  searchTimeout: number;
  option: {
    name: string,
    value: string
  };
}


export const InitialConfigs: NgdDropdownConfigs = {
  theme: 'default',
  placeholder: 'Select item',
  multiple: true,
  jsSearch: false,
  serverSearch: false,
  searchTimeout: 200,
  option: {
    name: 'text',
    value: 'id'
  }
};
