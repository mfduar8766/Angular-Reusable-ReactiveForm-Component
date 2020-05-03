import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from 'src/Models/fieldConfig.interface';

@Component({
  exportAs: 'dynamicForm',
  selector: 'app-dynamic-form',
  template: `
    <form
      class="dynamic-form"
      [formGroup]="form"
      (ngSubmit)="handleSubmit($event)"
    >
      <ng-container
        *ngFor="let field of config"
        appDynamicField
        [config]="field"
        [group]="form"
      >
      </ng-container>
    </form>
  `,
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FieldConfig[] = [];
  @Output() formSubmittedValues: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  get controls() {
    return this.config.filter(({ type }) => type !== 'button');
  }
  get changes() {
    return this.form.valueChanges;
  }
  get valid() {
    return this.form.valid;
  }
  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(field => {
      if (field.type === 'button') { return; }
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.formSubmittedValues.emit(this.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }
    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
