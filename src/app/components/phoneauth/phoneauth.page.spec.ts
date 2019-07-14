import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneauthPage } from './phoneauth.page';

describe('PhoneauthPage', () => {
  let component: PhoneauthPage;
  let fixture: ComponentFixture<PhoneauthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneauthPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneauthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
