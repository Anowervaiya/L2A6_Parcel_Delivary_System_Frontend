import type { TRole } from '@/interfaces/global.interface';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import type { ComponentType } from 'react';

import { Navigate } from 'react-router';

interface UserInfoResponse {
  data?: {
    data: {
      email?: string;
      role?: TRole;
    };
  };
  isLoading: any;
}

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery<UserInfoResponse>(undefined);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/" />;
    }

    return <Component />;
  };
};
