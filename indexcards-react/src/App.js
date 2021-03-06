import React, { Component } from 'react';
import './App.css';
import CardSets from './components/Cardsets/Cardsets';
import Cards from './components/Cards/Cards';
import PrivateRoute from './common/privateroute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import Login from './authentication/Login';
import Register from './authentication/Register';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/combine';
import Navbar from './components/Navigation/Navigation';

class App extends Component {


  componentDidMount () {
    if (localStorage.getItem('token')) {
      this.store.dispatch(loadUser());
    }
  }

  store = createStore(rootReducer, applyMiddleware(thunk));

  render() {
    
    return (
      <div className="App">
      <Provider store={this.store}>
       <Router>
        <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={CardSets}/>
            <Route exact path="/cards/:id/:title/" component={Cards}/>
            <Route exact path="/account/login/" component={Login}/>
            <Route exact path="/account/register/" component={Register}/>
          </Switch>
        </Router>
      </Provider>
      </div>
    );
  }
}

export default App;
