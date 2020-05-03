import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  Type,
  OnChanges,
  ComponentRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormButtonComponent } from '../Components/form-button/form-button.component';
import { FormInputComponent } from '../Components/form-input/form-input.component';
import { FormSelectComponent } from '../Components/form-select/form-select.component';
import { Field } from 'src/Models/field.interface';
import { FieldConfig } from 'src/Models/fieldConfig.interface';
import { FormDatePickerComponent } from '../Components/form-date-picker/form-date-picker.component';
import { FormCheckboxComponent } from '../Components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from '../Components/form-radio/form-radio.component';
import { FormMultiSelectComponent } from '../Components/form-multi-select/form-multi-select.component';

const components: { [type: string]: Type<Field> } = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent,
  date: FormDatePickerComponent,
  radiobutton: FormRadioComponent,
  checkbox: FormCheckboxComponent,
  multiSelect: FormMultiSelectComponent,
};

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(
      components[this.config.type]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
