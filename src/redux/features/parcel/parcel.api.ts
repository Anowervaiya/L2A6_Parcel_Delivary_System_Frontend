
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

    userInfo: builder.query({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
  }),
});

export const {
  useAddParcelMutation
 
} = parcelApi;
