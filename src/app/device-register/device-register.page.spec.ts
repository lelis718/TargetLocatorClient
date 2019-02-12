import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRegisterPage } from './device-register.page';

describe('DeviceRegisterPage', () => {
  let component: DeviceRegisterPage;
  let fixture: ComponentFixture<DeviceRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceRegisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
