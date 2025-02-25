import {
  Component,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { RoomOccupancy } from '../../models/reservation.model';

@Component({
  selector: 'app-room-occupancy-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './room-occupancy-chart.component.html',
  styleUrls: ['./room-occupancy-chart.component.scss']
})
export class RoomOccupancyChartComponent implements OnInit, OnDestroy {
  chartData: { name: string; value: number }[] = [];
  chartWidth = 500;
  chartHeight = 500;
  screenWidth = window.innerWidth;

  isLoading = true;
  error: string | null = null;
  private subscription!: Subscription;

  colorScheme: Color = {
    name: 'roomOccupancyScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF5722', '#4CAF50', '#2196F3']
  };

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.updateChartDimensions();

    // Fetch chart data
    this.subscription = this.reservationService.getRoomOccupancy().subscribe({
      next: (data: RoomOccupancy[]) => {
        this.chartData = data.map(item => ({
          name: item.roomId ? `Room #${item.roomId}` : 'No Room Assigned',
          value: item.count
        }));
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching room occupancy:', err);
        this.error = 'Failed to load room occupancy.';
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

  // Return the appropriate color for the label, matching the chart slices
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

