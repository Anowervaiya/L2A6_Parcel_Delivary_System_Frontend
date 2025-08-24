
import { baseApi } from '@/redux/baseApi';

export const parcelApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addParcel: builder.mutation({
      query: parcelInfo => ({
        url: '/parcel/create-parcel',
        method: 'POST',
        data: parcelInfo,
      }),
    }),
    changeParcelStatus: builder.mutation({
      query: payload => ({
        url: `/parcel/status`,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['PARCEL'],
    }),
    confirmParcel: builder.mutation({
      query: id => ({
        url: `/parcel/confirm/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['PARCEL'],
    }),
    cancelParcel: builder.mutation({
      query: id => ({
        url: `/parcel/cancel/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['PARCEL'],
    }),
    deleteParcel: builder.mutation({
      query: id => ({
        url: `/parcel/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PARCEL'],
    }),

    myParcel: builder.query({
      query: () => ({
        url: '/parcel/my-parcel',
        method: 'GET',
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
  }),
});

export const {
  useAddParcelMutation,
  useMyParcelQuery,
  useConfirmParcelMutation,
  useCancelParcelMutation,
  useAllParcelQuery,
  useDeleteParcelMutation,
  useChangeParcelStatusMutation
 
} = parcelApi;
