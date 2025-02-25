import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopReferrersChartComponent } from './top-referrers-chart.component';

describe('TopReferrersChartComponent', () => {
  let component: TopReferrersChartComponent;
  let fixture: ComponentFixture<TopReferrersChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopReferrersChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopReferrersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
