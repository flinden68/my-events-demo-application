import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EventList from './container/EventList'
import AddEvent from './container/AddEvent'
import Home from './Home'
import EditEvent from "./container/EditEvent";
import Login from "./container/Login";
import Register from "./container/Register";
import Account from "./container/Account";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/events' component={EventList}/>
            <Route path='/event/add' component={AddEvent}/>
            <Route path='/event/:id' component={EditEvent}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/account' component={Account}/>
        </Switch>
    </main>
)

export default Routes
