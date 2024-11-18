// dynamic-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import formDefinition from '../../assets/formDefinition.json';

@Component({
  selector: 'app-dynamic-form',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
  formFields: any[] = [];
  formData: any = {};

  ngOnInit() {
    this.formFields = formDefinition;
    console.log('Form Definition Loaded:', this.formFields);
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    console.log('Updated Form Data:', this.formData);
  }

  validateForm(): boolean {
    let isValid = true;
    this.formFields.forEach((field) => {
      if (field.validator?.includes('required') && !this.formData[field.name]) {
        console.log(`Validation failed for: ${field.name}`);
        isValid = false;
      }
    });
    return isValid;
  }

  handleSubmit() {
    if (this.validateForm()) {
      console.log('Form submitted successfully with data:', this.formData);
    } else {
      alert('Please fill in all required fields!');
    }
  }

  shouldRenderField(field: any): boolean {
    if (!field.condition) return true; // Render if no condition
    const { rules, condition } = field;
    if (condition === 'and') {
      return rules.every((rule: any) => this.evaluateCondition(rule));
    } else if (condition === 'or') {
      return rules.some((rule: any) => this.evaluateCondition(rule));
    }
    return true;
  }

  evaluateCondition(rule: any): boolean {
    const value = this.formData[rule.field];
    switch (rule.operator) {
      case '>=':
        return value >= rule.value;
      case '<=':
        return value <= rule.value;
      case '!=':
        return value != rule.value;
      default:
        return false;
    }
  }

  getInputType(fieldtype: string): string {
    switch (fieldtype) {
      case 'integer':
        return 'number';
      case 'date':
        return 'date';
      case 'boolean':
        return 'checkbox';
      default:
        return 'text';
    }
  }

}