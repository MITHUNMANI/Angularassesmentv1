// dynamic-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form fields', () => {
    component.ngOnInit();
    expect(component.formFields.length).toBeGreaterThan(0);
  });

  it('should show required asterisk for mandatory fields', () => {
    component.ngOnInit();
    const requiredField = component.formFields.find(field => field.validator.includes('required'));
    
    expect(requiredField.name).toContain('*');
  });
});