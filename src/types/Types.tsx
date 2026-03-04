export interface ISelectTime {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  type: string;
}

export interface ICustomTimeSelect {
  onChange: (value: string) => void;
  value: string;
  type: 'hour' | 'minutes';
  disabled?: boolean;
}
