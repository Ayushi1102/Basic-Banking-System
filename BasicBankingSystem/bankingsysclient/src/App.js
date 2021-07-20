import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import VcNavBar from './Component/JS/VcNavbar';
import BankingHome from './Component/JS/BankingHome';
import Customers from './Component/JS/Customers';
import TransferRecords from './Component/JS/TransferRecords';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Router>
          <VcNavBar/>
            <Switch>
              <Route 
                path="/" 
                exact
                render = {props => (
                  <BankingHome {...props}/>
                )} 
              />

              <Route 
                path="/customers" 
                exact
                render = {props => (
                  <Customers {...props}/>
                )} 
              />

              <Route 
                path="/transfer" 
                exact
                render = {props => (
                  <TransferRecords {...props}/>
                )} 
              />

            </Switch>
          </Router>  

      </div>


    )
  }

} 
export default App;
