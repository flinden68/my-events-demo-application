import {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {logout} from "../../actions/account";
import {useNavigate} from "react-router";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(logout())
            .then(() => navigate('/login'))
            .catch(error => console.log(error));
    }, []);

    return null
}
export default (Logout)
