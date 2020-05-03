import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/Models/fieldConfig.interface';
import { formConfig } from 'src/Models/form-config';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-dynamic-form
        [config]="config"
        (formSubmittedValues)="submit($event)"
      >
      </app-dynamic-form>
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  config: FieldConfig[] = formConfig;

  constructor() {}

  ngAfterViewInit() {
    this.form.changes.subscribe((change) => {
      this.form.controls.forEach((control) => {
        if (change[control.name] === '') {
          this.form.setDisabled('submit', true);
        } else {
          this.form.setDisabled('submit', false);
        }
      });
    });
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }
}
