import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import './index.css';
import './components/App.css';

import Farm from './components/Farm'
import Home from './components/Home'
import FarmField from './components/FarmField'
import NotFound from './components/NotFound'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className="app">
      <header className="app-header"></header>
      <div className="app-menu">
        <div className="app-menu__button"><FontAwesomeIcon size="3x" icon={faBars} /></div>
        <div className="app-menu__content">
          <Link to="/">Home</Link>
          <Link to="/farm">Fazendas</Link>
        </div>  
      </div>
      <div className="app-content">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path="/farm" exact={true} component={Farm} />
            <Route path="/farm/:farmId" component={Farm} />
            <Route path="/farmfield/:farmfieldId" exact={true} component={FarmField} />
            <Route path='*' component={NotFound} />
        </Switch>
      </div>
      <div className="app-footer">Todos os direitos reservados Aegro Farm ©</div>
    </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);