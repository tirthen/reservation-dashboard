import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import {
  ReservationResponse,
  Reservation,
  ReservationQueryParams
} from '../models/reservation.model';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  currentPage = 1;
  pageSize = 10;
  totalRecords = 0;
  totalPages = 0;

  searchTerm = '';
  statusFilter = '';
  sortKey = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  isLoading = false;
  error: string | null = null;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.isLoading = true;
    this.error = null;

    const queryParams: ReservationQueryParams = {
      page: this.currentPage,
      pageSize: this.pageSize,
      search: this.searchTerm,
      status: this.statusFilter,
      sortKey: this.sortKey,
      sortDirection: this.sortDirection
    };

    this.reservationService.getReservations(queryParams).subscribe({
      next: (response: ReservationResponse) => {
        this.reservations = response.reservations;
        this.totalRecords = response.totalRecords;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching reservations:', err);
        this.error = 'Failed to load reservations.';
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.fetchReservations();
  }

  onStatusChange(): void {
    this.currentPage = 1;
    this.fetchReservations();
  }

  onSort(column: string): void {
    if (this.sortKey === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = column;
      this.sortDirection = 'asc';
    }
    this.fetchReservations();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchReservations();
    }
  }

  editReservation(r: Reservation): void {
    alert(`Editing reservation #${r.id}`);
  }

  deleteReservation(r: Reservation): void {
    alert(`Deleting reservation #${r.id}`);
  }
}
