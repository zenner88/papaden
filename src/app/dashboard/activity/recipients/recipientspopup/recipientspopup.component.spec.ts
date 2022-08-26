import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientspopupComponent } from './recipientspopup.component';

describe('RecipientspopupComponent', () => {
  let component: RecipientspopupComponent;
  let fixture: ComponentFixture<RecipientspopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientspopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipientspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
