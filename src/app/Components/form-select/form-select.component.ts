import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from 'src/Models/field.interface';
import { FieldConfig } from 'src/Models/fieldConfig.interface';

@Component({
  selector: 'app-form-select',
  template: `
    <div class="dynamic-field form-select" [formGroup]="group">
      <label>{{ config.label }}</label>
      <p-dropdown
        [formControlName]="config.name"
        [options]="config.options"
      ></p-dropdown>
      <ng-container
        *ngIf="
          group.controls[this.config.name].touched &&
          group.controls[this.config.name].invalid
        "
      >
        <ng-container *ngFor="let validation of config.validations">
          <div *ngIf="group.get(config.name).hasError(validation.name)">
            {{ validation.message }}
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
