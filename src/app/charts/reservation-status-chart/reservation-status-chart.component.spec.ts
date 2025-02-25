import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStatusChartComponent } from './reservation-status-chart.component';

describe('ReservationStatusChartComponent', () => {
  let component: ReservationStatusChartComponent;
  let fixture: ComponentFixture<ReservationStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationStatusChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
