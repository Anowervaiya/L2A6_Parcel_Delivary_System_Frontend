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
    requested: number;
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
  data: SenderParcel[];


  meta: {
    total: number;
    page: number;
    limit:number,
    totalPages:number;
    pages: number;
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

// ============= ADMIN DASHBOARD TYPES =============
export interface AdminOverviewStats {
  data: {
    totalParcels: number;
    totalUsers: number;
    pendingDeliveries: number;
    revenueThisMonth: number
  };
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ParcelTrendItem {
  day: string;
  delivered: number;
  transit: number;
  pending: number;
}

export interface ParcelTrendsResponse {
  data: ParcelTrendItem[];
  message: string;
  statusCode: number;
  success: boolean;
}

export interface DistrictDataItem {
  district: string;
  delivered: number;
  transit: number;
  pending: number;
}

export interface DistrictDistributionResponse {
  data: DistrictDataItem[];
  message: string;
  statusCode: number;
  success: boolean;
}

export interface RevenueDataItem {
  month: string;
  revenue?: number;
  projection?: number;
}

export interface RevenueGrowthResponse {
  data: RevenueDataItem[];
  message: string;
  statusCode: number;
  success: boolean;
}

export interface SystemMetricsData {
  avgDeliveryTime: string;
  successRate: string;
  peakHours: string;
  activeNow: number;
}

export interface SystemMetricsResponse {
  data: SystemMetricsData;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ParcelTrendsParams {
  days?: number;
}

export interface DistrictDistributionParams {
  limit?: number;
}

export interface RevenueGrowthParams {
  months?: number;
}
// ============= API ENDPOINTS =============
export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getSenderDashboardStats: builder.query<SenderDashboardStats, void>({
      query: () => ({
        url: "/dashboard/sender/stats",
        method: "GET",
      }),
      providesTags: ["DASHBOARD"],
    }),

    getSenderParcels: builder.query<
      SenderParcelsResponse,
      SenderParcelsParams | void
    >({
      query: (params = {}) => ({
        url: "/dashboard/sender/parcels",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL", "DASHBOARD"],
    }),


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

    // ========== ADMIN DASHBOARD ==========
    getAdminOverview: builder.query<AdminOverviewStats, void>({
      query: () => ({
        url: '/dashboard/admin/overview',
        method: 'GET',
      }),
      providesTags: ['DASHBOARD'],
    }),

    getAdminParcelTrends: builder.query<ParcelTrendsResponse, ParcelTrendsParams | void>({
      query: (params = {}) => ({
        url: '/dashboard/admin/trends',
        method: 'GET',
        params,
      }),
      providesTags: ['DASHBOARD'],
    }),

    getAdminDistrictDistribution: builder.query<DistrictDistributionResponse, DistrictDistributionParams | void>({
      query: (params = {}) => ({
        url: '/dashboard/admin/districts',
        method: 'GET',
        params,
      }),
      providesTags: ['DASHBOARD'],
    }),

    getAdminRevenueGrowth: builder.query<RevenueGrowthResponse, RevenueGrowthParams | void>({
      query: (params = {}) => ({
        url: '/dashboard/admin/revenue',
        method: 'GET',
        params,
      }),
      providesTags: ['DASHBOARD'],
    }),

    getAdminSystemMetrics: builder.query<SystemMetricsResponse, void>({
      query: () => ({
        url: '/dashboard/admin/metrics',
        method: 'GET',
      }),
      providesTags: ['DASHBOARD'],
    }),

  }),


});

// ============= EXPORT HOOKS =============
export const {

  // Sender Dashboard hooks
  useGetSenderDashboardStatsQuery,
  useGetSenderParcelsQuery,
  // Receiver Dashboard hooks
  useGetReceiverDashboardStatsQuery,
  useGetReceiverParcelsQuery,
  // Admin Dashboard hooks
  useGetAdminOverviewQuery,
  useGetAdminParcelTrendsQuery,
  useGetAdminDistrictDistributionQuery,
  useGetAdminRevenueGrowthQuery,
  useGetAdminSystemMetricsQuery,
} = dashboardApi;