import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { DailyCount } from '../../models/reservation.model';

@Component({
  selector: 'app-daily-count-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './daily-count-chart.component.html',
  styleUrls: ['./daily-count-chart.component.scss']
})
export class DailyCountChartComponent implements OnInit, OnDestroy {
  chartData: { name: string; value: number }[] = [];
  chartWidth = 0;
  chartHeight = 0;

  isLoading = true;
  error: string | null = null;
  private subscription!: Subscription;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.updateChartDimensions(); // set initial dimensions
    this.subscription = this.reservationService.getDailyCounts().subscribe({
      next: (data: DailyCount[]) => {
        this.chartData = data.map(item => ({
          name: item.date,
          value: item.count
        }));
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching daily counts:', err);
        this.error = 'Failed to load daily reservation counts.';
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChartDimensions();
  }

  updateChartDimensions(): void {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.chartWidth = 800;
    } else if (width >= 768) {
      this.chartWidth = 600;
    } else {
      this.chartWidth = width - 40; // subtract some padding
    }
    // Choose a suitable ratio for bar charts
    this.chartHeight = Math.round(this.chartWidth * 0.6);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
