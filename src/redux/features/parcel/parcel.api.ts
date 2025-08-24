
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
    confirmParcel: builder.mutation({
      query: id => ({
        url: `/parcel/confirm/${id}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['PARCEL']
    }),
    cancelParcel: builder.mutation({
      query: id => ({
        url: `/parcel/cancel/${id}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['PARCEL']
    }),

    myParcel: builder.query({
      query: () => ({
        url: '/parcel/my-parcel',
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
  useCancelParcelMutation
 
} = parcelApi;
