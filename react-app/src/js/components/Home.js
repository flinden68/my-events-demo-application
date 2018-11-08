import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
    <div>
        <h1>Welcome to the my events!</h1>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/events'>All events</Link></li>
                <li><Link to='/event/add'>Add Event</Link></li>
            </ul>
        </nav>
    </div>
)

export default Home