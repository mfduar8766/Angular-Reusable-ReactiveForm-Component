// import { ValidatorFn } from '@angular/forms';

export interface Validator {
  name: string;
  validator: any;
  message: string;
}

export interface SelectionOptions {
  label: string;
  value: string;
}

export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  inputType?: string;
  options?: string[] | SelectionOptions[];
  placeholder?: string;
  type: string;
  validations?: Validator[];
  value?: any;
}
