import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import '../presentation/form.css';
import {logout} from "../../actions/account";

const mapStateToProps = state => {
    return { account: state.account };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

class Logout extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.logout()
    }

    render(){
        return null;
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)