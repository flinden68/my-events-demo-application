import {useSelector} from "react-redux";

const useAuth = () => {
    const account = useSelector(state => state.auth.account);
    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
    return {
        account,
        isAuthenticated
    };
};
export default useAuth;
