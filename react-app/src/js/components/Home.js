import React from 'react'
import { Link } from 'react-router-dom'
import { Translate } from "react-localize-redux";

const centerTextStyle = {
    centerTextStyle: 'center'
};

const Home = () => (
        <div className="row">
            <div className="col-2">
            
            </div>
            <div className="col-8 text-center"  style={centerTextStyle}>
                <h1><Translate id='title-home'></Translate></h1>
                <Link className='btn btn-primary' to='/register'><Translate id='button-register'></Translate></Link>
                <br />
                <br />
                <Link className='btn btn-primary' to='/login'><Translate id='button-login'></Translate></Link>
            </div>
            <div className="col-2"></div>
        </div>
)

export default Home