import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";

const mapStateToProps = state => {
    return { account: state.account };
};

/*const mapDispatchToProps = dispatch => {
    return {
        performLogin: login => dispatch(deleteEvent(event)),
        fetchAllEvents: () => dispatch(fetchAllEvents())
    };
};*/

class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUsername= this.handleChangeUsername.bind(this);
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleChangeUsername(e) {
        this.setState({ username: e.target.value });
    }

    onSubmit(e){

        e.preventDefault();

        if (!this.state.username) {
            this.setState(() => ({error: 'Please set username!'}));
        }else if (!this.state.password) {
                this.setState(() => ({ error: 'Please set password!' }));
        } else {
            this.setState(() => ({ error: '' }));

            let login = {
                username: this.state.username,
                password: this.state.password,
                _class: "nl.elstarit.event.service.model.Login"
            }

            console.log('Login: ' + login);

            //this.props.onSubmitEvent(event);
        }

    }

    render(){
        return (
            <div>
                <h2>Account</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            className="form-control"
                            type="text"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                        />
                    </div>
                    <button type="submit" className="btn btn-success float-right">
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Account)