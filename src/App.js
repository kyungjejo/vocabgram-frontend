import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { connect } from 'react-redux';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import MainHeader from './components/MainHeader';
import Watch from './pages/Watch';
import Infer from './pages/Infer';
import Practice from './pages/Practice';
import Home from './pages/Home';
import Internal from './pages/Internal';

function App(props) {
  return (
    <Router>
      <div>
        <MainHeader/>
          <Route exact path="/watch" component={Watch} />
          <Route exact path="/infer" component={Infer} />
          <Route exact path="/practice" component={Practice} />
          <Route exact path="/internal/:time/:wordIndex/:videoIndex/:word/:youtubeId/:unique" component={Internal} />
          <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default connect()(App);
