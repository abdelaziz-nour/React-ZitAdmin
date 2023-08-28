
import { useSelector } from 'react-redux';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import { RootState } from '../redux/app/store';

const RequireAuth = () => {

    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

    const location = useLocation();

    return (isAuthenticated) ? <Outlet/> : <Navigate to='/login' state={{from: location}} replace/>;
};

export default RequireAuth;
