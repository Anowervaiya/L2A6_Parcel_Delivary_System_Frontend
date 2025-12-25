import { baseApi } from '@/redux/baseApi';

export interface MonthlyDataItem {
  month: string;
  parcels: number;
}
export interface StatusDistributionItem {
  name: string;
  value: number;
}
// Types
export interface DashboardStats {
  data: {
    totalParcels: number;
  requested: number;
  inTransit: number;
  delivered: number;
  monthlyData:MonthlyDataItem[];
  statusDistribution:StatusDistributionItem[];
  },
  message:string;
  statusCode:number;
  success:boolean
}

export interface Parcel {
  _id: string;
  trackingId: string;
  receiver: { name: string };
  deliveryAddress: string;
  currentStatus: string;
  createdAt: string;
}

export interface RecentParcelsResponse {
  parcels: Parcel[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface RecentParcelsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const parcelApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Existing endpoints
    addParcel: builder.mutation({
      query: parcelInfo => ({
        url: '/parcel/create-parcel',
        method: 'POST',
        data: parcelInfo,
      }),
      invalidatesTags: ['PARCEL', 'DASHBOARD'],
    }),

    changeParcelStatus: builder.mutation({
      query: payload => ({
        url: `/parcel/status`,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['PARCEL', 'DASHBOARD'],
    }),

    confirmParcel: builder.mutation({
      query: id => ({
        url: `/parcel/confirm/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['PARCEL', 'DASHBOARD'],
    }),

    cancelParcel: builder.mutation({
      query: id => ({
        url: `/parcel/cancel/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['PARCEL', 'DASHBOARD'],
    }),

    deleteParcel: builder.mutation({
      query: id => ({
        url: `/parcel/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PARCEL', 'DASHBOARD'],
    }),

    myParcel: builder.query({
      query: () => ({
        url: '/parcel/my-parcel',
        method: 'GET',
      }),
      providesTags: ['PARCEL'],
    }),

    filterByStatus: builder.query({
      query: payload => ({
        url: `/parcel/filterByStatus`,
        method: 'GET',
        params: payload,
      }),
      providesTags: ['PARCEL'],
    }),

    allParcel: builder.query({
      query: () => ({
        url: '/parcel/all-parcel',
        method: 'GET',
      }),
      providesTags: ['PARCEL'],
    }),

    // Dashboard endpoints
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => ({
        url: '/parcel/dashboard/stats',
        method: 'GET',
      }),
      providesTags: ['DASHBOARD'],
    }),

    getRecentParcels: builder.query<RecentParcelsResponse, RecentParcelsParams | void>({
      query: (params = {}) => ({
        url: '/parcel/dashboard/recent',
        method: 'GET',
        params,
      }),
      providesTags: ['PARCEL', 'DASHBOARD'],
    }),
  }),
});

export const {
  // Existing hooks
  useAddParcelMutation,
  useMyParcelQuery,
  useConfirmParcelMutation,
  useCancelParcelMutation,
  useAllParcelQuery,
  useDeleteParcelMutation,
  useChangeParcelStatusMutation,
  useFilterByStatusQuery,
  
  // Dashboard hooks
  useGetDashboardStatsQuery,
  useGetRecentParcelsQuery,
} = parcelApi;