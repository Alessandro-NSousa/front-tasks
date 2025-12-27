import { NgFor } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-primary-select',
  imports: [MatFormFieldModule, MatSelectModule, NgFor],
  templateUrl: './primary-select.component.html',
  styleUrl: './primary-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimarySelectComponent),
      multi: true
    }
  ]
  
})
export class PrimarySelectComponent implements ControlValueAccessor {

  @Input() label = '';
  @Input() options: { value: string; label: string }[] = [];

  value: any;
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
