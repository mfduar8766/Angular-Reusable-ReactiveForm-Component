import { FormGroup } from '@angular/forms';
import { FieldConfig } from './fieldConfig.interface';

export interface Field {
  config: FieldConfig;
  group: FormGroup;
}
