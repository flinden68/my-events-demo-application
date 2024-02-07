import React from 'react'
import NavItem from "./presentation/NavItem";
import LanguageToggle from './presentation/LanguageToggle';
import {Translate} from "react-localize-redux";
import useAuth from "../hooks/useAuth";

const Header = () => {

    const { account, isAuthenticated } = useAuth();

    return (
            <div>
                <LanguageToggle />
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/"><Translate id="website-title"></Translate></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav mr-auto">
                            {isAuthenticated && <NavItem to="/events" label="nav-all-events" />}
                            {isAuthenticated && <NavItem to="/event/add" label="nav-add-event" />}
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <span className="nav-link">
                                    {account ? account.name: 'Anonymous'}
                                </span>
                            </li>
                            {isAuthenticated && <NavItem to="/account" label="nav-account" />}
                            {isAuthenticated && <NavItem to="/logout" label="nav-logout" />}
                            {!isAuthenticated && <NavItem to="/login" label="nav-login" />}
                        </ul>
                    </div>
                </nav>
            </div>
        )

}

export default (Header)
