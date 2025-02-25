export interface DashboardStats {
    totalReservations: number;
    confirmedReservations: number;
    pendingReservations: number;
    cancelledReservations: number;
    finishedCount: number;
    totalGuestsToday: number;
}

export interface PeopleCount {
    totalGuests: number;
    children: number;
    highChairs: number;
}

export interface Revenue {
    totalRevenue: number;
}

export interface ReservationStatus {
    status: string;
    count: number;
}

export interface DailyCount {
    date: string;
    count: number;
}

export interface RoomOccupancy {
    roomId: number | null;
    count: number;
}

export interface TopReferrer {
    referrer: string | null;
    count: number;
}

export interface Reservation {
    id: number;
    betriebId: number;
    gastId: number;
    status: string;
    peopleCount: number;
    reservedFor: string;
    source: string;
    createdAt: string;
    // add more fields if needed
}

export interface ReservationResponse {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    reservations: Reservation[];
}

export interface ReservationQueryParams {
    page: number;
    pageSize: number;
    search?: string;
    status?: string;
    sortKey?: string;
    sortDirection?: 'asc' | 'desc';
}
