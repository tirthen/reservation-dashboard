import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { ReservationStatus } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation-status-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './reservation-status-chart.component.html',
  styleUrls: ['./reservation-status-chart.component.scss']
})
export class ReservationStatusChartComponent implements OnInit, OnDestroy {
  chartData: { name: string; value: number }[] = [];
  colorScheme: Color = {
    name: 'statusScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    // Example domain colors: (Confirmed, Pending, Cancelled, Finished)
    domain: ['#F44336', '#FF9800', '#4CAF50', '#2196F3']
  };

  chartWidth = 500;
  chartHeight = 500;
  screenWidth = window.innerWidth;

  isLoading = true;
  error: string | null = null;
  private subscription!: Subscription;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.updateChartDimensions();

    // Fetch data
    this.subscription = this.reservationService.getReservationStatus().subscribe({
      next: (data: ReservationStatus[]) => {
        this.chartData = data.map(item => ({
          name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
          value: item.count
        }));
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching reservation status:', err);
        this.error = 'Failed to load reservation status.';
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.screenWidth = window.innerWidth;
    this.updateChartDimensions();
  }

  updateChartDimensions(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      this.chartWidth = 1000;
      this.chartHeight = 300;
    } else if (screenWidth >= 768) {
      this.chartWidth = 680;
      this.chartHeight = 500;
    } else {
      this.chartWidth = screenWidth - 80;
      this.chartHeight = this.chartWidth;
    }
  }

  // Helper to match the slice colors for the custom legend
  getColor(label: string): string {
    const idx = this.chartData.findIndex(item => item.name === label);
    return this.colorScheme.domain[idx % this.colorScheme.domain.length];
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
