import React from 'react'
import NavItem from "./presentation/NavItem";

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">My Events</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
                <NavItem to="/" label="Home" />
                <NavItem to="/events" label="All events" />
                <NavItem to="/event/add" label="Add event" />
            </ul>
            <ul className="navbar-nav ml-auto">
                {/*<li className="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                    </div>
                </li>*/}
                <NavItem to="/account" label="Account" />
                <NavItem to="/login" label="Login" />
                <NavItem to="/register" label="Register" />
            </ul>
        </div>
    </nav>
)

export default Header