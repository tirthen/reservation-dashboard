import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { TopReferrer } from '../../models/reservation.model';

@Component({
  selector: 'app-top-referrers-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './top-referrers-chart.component.html',
  styleUrls: ['./top-referrers-chart.component.scss']
})
export class TopReferrersChartComponent implements OnInit, OnDestroy {
  chartData: { name: string; value: number }[] = [];
  chartWidth = 0;
  chartHeight = 0;

  colorScheme: Color = {
    name: 'topReferrersScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4CAF50', '#2196F3', '#FF5722', '#9C27B0', '#FFC107', '#009688']
  };

  isLoading = true;
  error: string | null = null;
  private subscription!: Subscription;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.updateChartDimensions();
    this.subscription = this.reservationService.getTopReferrers().subscribe({
      next: (data: TopReferrer[]) => {
        // Sort descending by count if you prefer
        data.sort((a, b) => b.count - a.count);
        this.chartData = data.map(item => ({
          name: item.referrer || 'Unknown',
          value: item.count
        }));
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching top referrers:', err);
        this.error = 'Failed to load top referrers.';
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
      this.chartWidth = 700;
    } else if (width >= 768) {
      this.chartWidth = 550;
    } else {
      this.chartWidth = width - 40;
    }
    this.chartHeight = Math.round(this.chartWidth * 0.7);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
