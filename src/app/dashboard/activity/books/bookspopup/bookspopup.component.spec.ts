import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookspopupComponent } from './bookspopup.component';

describe('BookspopupComponent', () => {
  let component: BookspopupComponent;
  let fixture: ComponentFixture<BookspopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookspopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
