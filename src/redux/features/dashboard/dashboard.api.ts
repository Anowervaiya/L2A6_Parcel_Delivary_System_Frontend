// redux/features/dashboard/dashboard.api.ts
import { baseApi } from '@/redux/baseApi';

// ============= SENDER DASHBOARD TYPES =============
export interface MonthlyDataItem {
  month: string;
  parcels: number;
}

export interface StatusDistributionItem {
  name: string;
  value: number;
}

export interface SenderDashboardStats {
  data: {
    totalParcels: number;
    pending: number;
    inTransit: number;
    delivered: number;
    monthlyData: MonthlyDataItem[];
    statusDistribution: StatusDistributionItem[];
  };
  message: string;
  statusCode: number;
  success: boolean;
}

export interface SenderParcel {
  _id: string;
  trackingId: string;
  receiver: { name: string };
  deliveryAddress: string;
  currentStatus: string;
  createdAt: string;
}

export interface SenderParcelsResponse {
  data: {
    parcels: SenderParcel[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };
  message: string;
  statusCode: number;
  success: boolean;
}

export interface SenderParcelsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

// ============= RECEIVER DASHBOARD TYPES =============
export interface DeliveryTrendItem {
  month: string;
  deliveries: number;
}

export interface LocationDistributionItem {
  name: string;
  value: number;
}

export interface ReceiverDashboardStats {
  data: {
    incomingParcels: number;
    deliveredThisMonth: number;
    pendingConfirmation: number;
    totalReceived: number;
    deliveryTrend: DeliveryTrendItem[];
    locationDistribution: LocationDistributionItem[];
  };
  message: string;
  statusCode: number;
  success: boolean;
}

export interface IncomingParcel {
  _id: string;
  trackingId: string;
  sender: {
    name: string;
    email: string;
  };
  deliveryAddress: string;
  currentStatus: string;
  weight: number;
  fee: number;
  deliveryDate: string;
  createdAt: string;
}

export interface ReceiverParcelsResponse {
  data: {
    parcels: IncomingParcel[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ReceiverParcelsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

// ============= API ENDPOINTS =============
export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ========== SENDER DASHBOARD ==========
    // getSenderDashboardStats: builder.query<SenderDashboardStats, void>({
    //   query: () => ({
    //     url: '/dashboard/sender/stats',
    //     method: 'GET',
    //   }),
    //   providesTags: ['DASHBOARD'],
    // }),

    // getSenderParcels: builder.query<SenderParcelsResponse, SenderParcelsParams | void>({
    //   query: (params = {}) => ({
    //     url: '/dashboard/sender/parcels',
    //     method: 'GET',
    //     params,
    //   }),
    //   providesTags: ['PARCEL', 'DASHBOARD'],
    // }),

    // ========== RECEIVER DASHBOARD ==========
    getReceiverDashboardStats: builder.query<ReceiverDashboardStats, void>({
      query: () => ({
        url: '/dashboard/receiver/stats',
        method: 'GET',
      }),
      providesTags: ['DASHBOARD'],
    }),

    getReceiverParcels: builder.query<ReceiverParcelsResponse, ReceiverParcelsParams | void>({
      query: (params = {}) => ({
        url: '/dashboard/receiver/parcels',
        method: 'GET',
        params,
      }),
      providesTags: ['PARCEL', 'DASHBOARD'],
    }),
  }),
});

// ============= EXPORT HOOKS =============
export const {
  // Sender Dashboard hooks
//   useGetSenderDashboardStatsQuery,
//   useGetSenderParcelsQuery,

  // Receiver Dashboard hooks
  useGetReceiverDashboardStatsQuery,
  useGetReceiverParcelsQuery,
} = dashboardApi;