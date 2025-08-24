
import { baseApi } from '@/redux/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    blockUser: builder.mutation({
      query: payload => ({
        url: `/user/block`,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['USER'],
    }),

    deleteuser: builder.mutation({
      query: id => ({
        url: `/user/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['USER'],
    }),

    allUser: builder.query({
      query: () => ({
        url: '/user/all-users',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
  }),
});

export const {
  useAllUserQuery,
  useBlockUserMutation,
  useDeleteuserMutation

 
} = userApi;
