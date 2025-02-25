import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../components/card/card.component';
import { ReservationService } from '../services/reservation.service';
import { DashboardStats, PeopleCount, Revenue } from '../models/reservation.model';

import { ReservationStatusChartComponent } from '../charts/reservation-status-chart/reservation-status-chart.component';
import { DailyCountChartComponent } from '../charts/daily-count-chart/daily-count-chart.component';
import { RoomOccupancyChartComponent } from '../charts/room-occupancy-chart/room-occupancy-chart.component';
import { TopReferrersChartComponent } from '../charts/top-referrers-chart/top-referrers-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ReservationStatusChartComponent,
    DailyCountChartComponent,
    RoomOccupancyChartComponent,
    TopReferrersChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats!: DashboardStats;
  peopleCount!: PeopleCount;
  revenue!: Revenue;

  isLoadingStats = true;
  statsError: string | null = null;

  isLoadingPeople = true;
  peopleError: string | null = null;

  isLoadingRevenue = true;
  revenueError: string | null = null;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadPeopleCount();
    this.loadRevenue();
  }

  loadDashboardStats(): void {
    this.isLoadingStats = true;
    this.reservationService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoadingStats = false;
      },
      error: (err: any) => {
        console.error('Error fetching dashboard stats:', err);
        this.statsError = 'Failed to load dashboard stats.';
        this.isLoadingStats = false;
      }
    });
  }

  loadPeopleCount(): void {
    this.isLoadingPeople = true;
    this.reservationService.getPeopleCount().subscribe({
      next: (data) => {
        this.peopleCount = data;
        this.isLoadingPeople = false;
      },
      error: (err: any) => {
        console.error('Error fetching people count:', err);
        this.peopleError = 'Failed to load people count.';
        this.isLoadingPeople = false;
      }
    });
  }

  loadRevenue(): void {
    this.isLoadingRevenue = true;
    this.reservationService.getRevenue().subscribe({
      next: (data) => {
        this.revenue = data;
        this.isLoadingRevenue = false;
      },
      error: (err: any) => {
        console.error('Error fetching revenue:', err);
        this.revenueError = 'Failed to load revenue.';
        this.isLoadingRevenue = false;
      }
    });
  }
}
