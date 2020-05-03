import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/Models/fieldConfig.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-dynamic-form
        [config]="config"
        #form="dynamicForm"
        (formSubmittedValues)="submit($event)"
      >
      </app-dynamic-form>
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full Name',
      name: 'name',
      inputType: 'text',
      placeholder: 'Enter your name',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Name is required.',
        },
      ],
    },
    {
      type: 'input',
      label: 'Email Address',
      inputType: 'email',
      name: 'email',
      value: 'bob123@gmail.com',
      placeholder: 'Enter your email',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Email Required.',
        },
        {
          name: 'pattern',
          validator: Validators.pattern(
            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
          ),
          message: 'Invalid email.',
        },
      ],
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: [
        { label: 'French', value: 'French' },
        { label: 'Asian', value: 'Asian' },
        { label: 'Italian', value: 'Italian' },
      ],
      placeholder: 'Select an option',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Food is required.',
        },
      ],
    },
    {
      type: 'input',
      label: 'Password',
      inputType: 'password',
      placeholder: 'Enter Password',
      name: 'password',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Password Required.',
        },
      ],
    },
    {
      type: 'multiSelect',
      label: 'Select Cities',
      name: 'multiSelect',
      value: ['PRS'],
      options: [
        { label: 'New York', value: 'NY' },
        { label: 'Rome', value: 'RM' },
        { label: 'London', value: 'LDN' },
        { label: 'Istanbul', value: 'IST' },
        { label: 'Paris', value: 'PRS' },
      ],
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'City is required.',
        },
      ],
    },
    {
      type: 'date',
      label: 'DOB',
      name: 'dob',
      inputType: 'date',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Date Required.',
        },
      ],
    },
    {
      type: 'checkbox',
      label: 'Accept Terms',
      name: 'term',
      inputType: 'checkbox',
      value: true,
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
      disabled: true,
    },
  ];

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
