import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from 'src/Models/field.interface';
import { FieldConfig } from 'src/Models/fieldConfig.interface';

@Component({
  selector: 'app-form-button',
  template: `
    <div class="dynamic-field form-button" [formGroup]="group">
      <button [disabled]="config.disabled" type="submit">
        {{ config.label }}
      </button>
    </div>
  `,
})
export class FormButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
