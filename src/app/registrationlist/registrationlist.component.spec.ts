import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationlistComponent } from './registrationlist.component';

describe('RegistrationlistComponent', () => {
  let component: RegistrationlistComponent;
  let fixture: ComponentFixture<RegistrationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
