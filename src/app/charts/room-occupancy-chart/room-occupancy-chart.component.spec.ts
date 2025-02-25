import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOccupancyChartComponent } from './room-occupancy-chart.component';

describe('RoomOccupancyChartComponent', () => {
  let component: RoomOccupancyChartComponent;
  let fixture: ComponentFixture<RoomOccupancyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomOccupancyChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomOccupancyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
