import React, { Component } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css'

import Home from './views/Home'

require('bootstrap')




const WebRouter = () => (
    <Router>
        <div className='mh-100 view-container container-fluid'>            
            <Route exact path='/' component={Home} />
        </div>
    </ Router>
)

export default WebRouter;
