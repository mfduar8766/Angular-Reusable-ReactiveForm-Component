import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicFormComponent } from 'src/app/dynamic-form/dynamic-form.component';
import { FormInputComponent } from 'src/app/Components/form-input/form-input.component';
import { FormSelectComponent } from 'src/app/Components/form-select/form-select.component';
import { FormButtonComponent } from 'src/app/Components/form-button/form-button.component';
import { DynamicFieldDirective } from 'src/app/Directives/dynamic-field.directive';
import { FormDatePickerComponent } from 'src/app/Components/form-date-picker/form-date-picker.component';
import { FormCheckboxComponent } from 'src/app/Components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from 'src/app/Components/form-radio/form-radio.component';
import { FormMultiSelectComponent } from 'src/app/Components/form-multi-select/form-multi-select.component';
import { FormSliderComponent } from 'src/app/Components/form-slider/form-slider.component';

// PrimeNG Modules
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectModule,
    CalendarModule,
    DropdownModule,
    SliderModule
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormDatePickerComponent,
    FormCheckboxComponent,
    FormRadioComponent,
    FormMultiSelectComponent,
    FormSliderComponent
  ],
  exports: [DynamicFormComponent],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormDatePickerComponent,
    FormCheckboxComponent,
    FormRadioComponent,
    FormMultiSelectComponent,
    FormSliderComponent
  ],
})
export class DynamicFormModule { }
