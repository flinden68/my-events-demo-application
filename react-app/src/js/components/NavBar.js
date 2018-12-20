import React, {Component} from 'react'
import NavItem from "./presentation/NavItem";
import store from '../store/store'
import LanguageToggle from './presentation/LanguageToggle';
import { Translate, getActiveLanguage } from "react-localize-redux";
// The Header creates links that can be used to navigate
// between routes.

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            account: props.account ? props.account : null,
            isAuthenticated: props.account ? true : false
        }

        this.accountListener = this.accountListener.bind(this);
        store.subscribe(this.accountListener);
    }

    accountListener() {
        let account = store.getState().account;
        let language = getActiveLanguage(store.getState().localize).code
        if(account){
            this.setState({ account: account });
            this.setState({ isAuthenticated: true });
        }else{
            this.setState({ account: null });
            this.setState({ isAuthenticated: false });
        }

        //console.log('listner: ' + getActiveLanguage(store.getState().localize).code);
    }

    render() {
        return (
            <div>
                <LanguageToggle />
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#"><Translate id="website-title"></Translate></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav mr-auto">
                            <NavItem to="/" label="nav-home"/>
                            {this.state.isAuthenticated && <NavItem to="/events" label="nav-all-events" />}
                            {this.state.isAuthenticated && <NavItem to="/event/add" label="nav-add-event" />}
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <span className="nav-link">
                                    {this.state.account ? this.state.account.email: 'Anonymous'}
                                </span>
                            </li>
                            {this.state.isAuthenticated && <NavItem to="/account" label="nav-account" />}
                            {this.state.isAuthenticated && <NavItem to="/logout" label="nav-logout" />}
                            {!this.state.isAuthenticated && <NavItem to="/login" label="nav-login" />}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }

}

export default (Header)