export interface NgdDropdownConfigs {
  theme: 'default';
  placeholder: string;
  noData: string;
  selectAll: boolean;
  selectAllText: string;
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
  noData: 'No data found!',
  selectAll: false,
  selectAllText: 'Select all',
  multiple: false,
  jsSearch: false,
  serverSearch: false,
  searchTimeout: 200,
  option: {
    name: 'text',
    value: 'id'
  }
};
