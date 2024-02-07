import React from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {Translate} from "react-localize-redux";

const NavItem = ({ to, label }) => {
    let location = useLocation();
   const isActive = location.pathname === to;
    let classes = ["nav-item"];
    if (isActive) classes.push("active");

    return (
        <li className={classes.join(" ")}>
            {<Link className="nav-link" to={to}>
                <Translate id={label}></Translate>
            </Link>}
        </li>
    );
};

export default NavItem
