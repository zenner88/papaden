import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberpopupComponent } from './memberpopup.component';

describe('MemberpopupComponent', () => {
  let component: MemberpopupComponent;
  let fixture: ComponentFixture<MemberpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
