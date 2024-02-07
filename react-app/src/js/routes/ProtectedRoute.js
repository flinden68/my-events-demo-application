import {Navigate, useLocation} from "react-router";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({
                            children
                        }) => {
    const { isAuthenticated } = useAuth();
    let location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return children
};
export default ProtectedRoute;
