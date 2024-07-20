import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxInputPercentageComponent } from './mx-input-percentage.component';

describe('MxInputPercentageComponent', () => {
  let component: MxInputPercentageComponent;
  let fixture: ComponentFixture<MxInputPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MxInputPercentageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MxInputPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
