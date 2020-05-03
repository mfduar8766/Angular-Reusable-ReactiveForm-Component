import { Component, OnInit } from '@angular/core';
import { Field } from 'src/Models/field.interface';
import { FieldConfig } from 'src/Models/fieldConfig.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-slider',
  template: `
    <div style="display: 'flex'; align-items: 'center';" [formGroup]="group">
      <label>{{ config.label }}</label>
      <p-slider [style]="{width: '300px'}" [formControlName]="config.name"></p-slider>
    </div>
  `,
})
export class FormSliderComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
