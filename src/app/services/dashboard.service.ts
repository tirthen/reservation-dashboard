// src/app/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReservationStatusData } from '../models/reservation-status-data.model';

export interface DashboardStats {
  totalReservations: number;
  confirmedReservations: number;
  pendingReservations: number;
  cancelledReservations: number;
  finishedCount: number;
  totalGuestsToday: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/dashboard/stats';
  private statusApiUrl = 'http://localhost:3000/charts/reservation-status';
  private revenueApiUrl = 'http://localhost:3000/reservations/revenue';

  constructor() { }

  getDashboardStats(): Observable<DashboardStats> {
    // axios.get returns a Promise; we convert it into an Observable
    return from(axios.get<DashboardStats>(this.apiUrl)).pipe(
      map(response => response.data)
    );
  }

  getReservationStatusChartData(): Observable<ReservationStatusData[]> {
    return from(axios.get<ReservationStatusData[]>(this.statusApiUrl)).pipe(
      map((response) => response.data)
    );
  }

  getRevenue(): Observable<number> {
    // The API returns { "totalRevenue": 0 }
    // We'll map to a single number
    return from(axios.get<{ totalRevenue: number }>(this.revenueApiUrl)).pipe(
      map(response => response.data.totalRevenue)
    );
  }
}
