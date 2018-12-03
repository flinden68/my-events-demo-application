import React from "react";
import Routes from './Routes'
import NavBar from "./NavBar";

class App extends React.Component {
    constructor(props){
        super(props);
        //console.log('app account: ' + JSON.stringify(this.props.account));
    }

    render() {
        return (<div>
            <NavBar />
            <Routes/>
        </div>)
    }
};
export default (App);