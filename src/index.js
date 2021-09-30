import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Route, Link, } from "react-router-dom";
import HomeComponent from './page/home'
import AboutComponent from './page/about'
import TestComponent from './page/test'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div >
          <Route path="/" exact component={HomeComponent} />
          <Route path="/about" exact component={AboutComponent}/>
          <Route path="/test" exact component={TestComponent}></Route>
      </div>  
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
