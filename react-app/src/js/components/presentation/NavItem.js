import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Translate } from "react-localize-redux";

const NavItem = ({ isActive, to, label }) => {
    let classes = ["nav-item"];
    if (isActive) classes.push("active");

    return (
        <li className={classes.join(" ")}>
            <Link className="nav-link" to={to}>
                <Translate id={label}></Translate>
            </Link>
        </li>
    );
};

export default withRouter(({ location, ...props }) => {
    const isActive = location.pathname === props.to;

    return <NavItem {...props} isActive={isActive} />;
});