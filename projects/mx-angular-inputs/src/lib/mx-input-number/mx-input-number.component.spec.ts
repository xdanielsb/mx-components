import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxInputNumberComponent } from './mx-input-number.component';

describe('MxInputNumberComponent', () => {
  let component: MxInputNumberComponent;
  let fixture: ComponentFixture<MxInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MxInputNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MxInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
