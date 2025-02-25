import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCountChartComponent } from './daily-count-chart.component';

describe('DailyCountChartComponent', () => {
  let component: DailyCountChartComponent;
  let fixture: ComponentFixture<DailyCountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyCountChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
