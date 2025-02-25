import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  DashboardStats,
  PeopleCount,
  Revenue,
  ReservationStatus,
  DailyCount,
  RoomOccupancy,
  TopReferrer,
  ReservationResponse,
  ReservationQueryParams
} from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private dashboardStatsUrl = 'http://localhost:3000/dashboard/stats';
  private peopleCountUrl = 'http://localhost:3000/reservations/people-count';
  private revenueUrl = 'http://localhost:3000/reservations/revenue';
  private reservationStatusUrl = 'http://localhost:3000/charts/reservation-status';
  private dailyCountUrl = 'http://localhost:3000/reservations/daily-count';
  private roomOccupancyUrl = 'http://localhost:3000/reservations/room-occupancy';
  private topReferrersUrl = 'http://localhost:3000/reservations/top-referrers';
  private reservationsUrl = 'http://localhost:3000/reservations';

  getDashboardStats(): Observable<DashboardStats> {
    return from(axios.get<DashboardStats>(this.dashboardStatsUrl)).pipe(
      map(res => res.data)
    );
  }

  getPeopleCount(): Observable<PeopleCount> {
    return from(axios.get<PeopleCount>(this.peopleCountUrl)).pipe(
      map(res => res.data)
    );
  }

  getRevenue(): Observable<Revenue> {
    return from(axios.get<Revenue>(this.revenueUrl)).pipe(
      map(res => res.data)
    );
  }

  getReservationStatus(): Observable<ReservationStatus[]> {
    return from(axios.get<ReservationStatus[]>(this.reservationStatusUrl)).pipe(
      map(res => res.data)
    );
  }

  getDailyCounts(): Observable<DailyCount[]> {
    return from(axios.get<DailyCount[]>(this.dailyCountUrl)).pipe(
      map(res => res.data)
    );
  }

  getRoomOccupancy(): Observable<RoomOccupancy[]> {
    return from(axios.get<RoomOccupancy[]>(this.roomOccupancyUrl)).pipe(
      map(res => res.data)
    );
  }

  getTopReferrers(): Observable<TopReferrer[]> {
    return from(axios.get<TopReferrer[]>(this.topReferrersUrl)).pipe(
      map(res => res.data)
    );
  }

  getReservations(params: ReservationQueryParams): Observable<ReservationResponse> {
    const queryParams = {
      page: params.page,
      limit: params.pageSize,
      search: params.search,
      status: params.status,
      sortBy: params.sortKey,
      order: params.sortDirection?.toUpperCase() || 'DESC'
    };
    return from(axios.get<ReservationResponse>(this.reservationsUrl, { params: queryParams })).pipe(
      map(res => res.data)
    );
  }
}
