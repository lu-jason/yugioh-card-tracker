import { Navigate, Outlet } from 'react-router-dom';

import { selectUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../hooks';

export default function AuthRoutes() {
  const user = useAppSelector(selectUser);

  return Boolean(user) ? <Outlet /> : <Navigate to='/auth' />;
}
