import React, {useEffect} from "react";
import NavBar from "./NavBar";
import {withLocalize} from 'react-localize-redux';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home";
import EventList from "./container/EventList";
import AddEvent from "./container/AddEvent";
import EditEvent from "./container/EditEvent";
import Login from "./container/Login";
import Logout from "./container/Logout";
import Register from "./container/Register";
import Account from "./container/Account";
import {renderToStaticMarkup} from "react-dom/server";
import globalTranslations from '../translations/global.json';
import {Routes} from "react-router";
import ProtectedRoute from "../routes/ProtectedRoute";

const App = () => {
    /*useEffect(() => {
        props.initialize({
            languages: [
                { name: 'English', code: 'en' },
                { name: 'Dutch', code: 'nl' }
            ],
            translation: globalTranslations,
            options: {
                renderToStaticMarkup,
                renderInnerHtml: true,
                defaultLanguage: "en"
            }
        });
    }, []);*/

    return (<div>
            <BrowserRouter>
                <NavBar/>
                <main>
                    <Routes>
                        <Route exact path='/' element={<Home/>}/>
                        <Route exact path='/login' element={<Login/>}/>
                        <Route exact path='/register' element={<Register/>}/>
                        <Route exact path='/events' element={
                            <ProtectedRoute>
                                <EventList/>
                            </ProtectedRoute>
                        }></Route>
                        <Route exact path='/event/add' element={
                            <ProtectedRoute>
                                <AddEvent/>
                            </ProtectedRoute>
                        }></Route>
                        <Route exact path='/event/:id' element={
                            <ProtectedRoute>
                                <EditEvent/>
                            </ProtectedRoute>
                        }></Route>
                        <Route exact path='/logout' element={
                            <ProtectedRoute>
                                <Logout/>
                            </ProtectedRoute>
                        }></Route>
                        <Route exact path='/account' element={
                            <ProtectedRoute>
                                <Account/>
                            </ProtectedRoute>
                        }></Route>
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
};
export default withLocalize(App);
