import { baseApi } from '@/redux/baseApi';

export interface MonthlyDataItem {
  month: string;
  parcels: number;
}
export interface StatusDistributionItem {
  name: string;
  value: number;
}
export interface IParcel {
  _id: string;
  trackingId: string;
  sender: string;
  receiver: string;
  currentStatus: string;
  deliveryAddress: string;
  deliveryDate: string;
  weight: number;
  fee: number;
}

export interface ParcelMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AllParcelResponse {
  data: IParcel[];
  meta: ParcelMeta;
  success: boolean;
  message: string;
  statusCode: number;
}

export interface AllParcelQuery {
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

    allParcel: builder.query<AllParcelResponse, AllParcelQuery>({
      query: (query) => ({
        url: '/parcel/all-parcel',
        method: 'GET',
        params: query, 
      }),
      providesTags: ['PARCEL'],
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
  
} = parcelApi;