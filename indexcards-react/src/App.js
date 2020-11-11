import React, { Component } from 'react';
import './App.css';
import CardSets from './components/Cardsets/Cardsets';
import Cards from './components/Cards/Cards';
import PrivateRoute from './common/privateroute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import Login from './authentication/Login';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/combine';
import Navbar from './components/Navigation/Navigation';

class App extends Component {


  // Component did mount should be called after user is authenticated,
  // NOT BEFORE
  componentDidMount () {
    console.log('app: componentDidMount');
    this.store.dispatch(loadUser());
  }

  store = createStore(rootReducer, applyMiddleware(thunk));

  render() {
    /*
    TAKE NAVIGATION BAR OUT FROM LOGIN.
    ADD FEATURE THAT REDIRECTS UNAUTHORIZED USERS TO LOGIN
    */
    //console.log(this.props.username);
    //console.log(this.props.isAuthenticated);
    
    return (
      <div className="App">
      <Provider store={this.store}>
       <Router>
        <Navbar />
          <Switch>
            <PrivateRoute exact path="/" component={CardSets}/>
            <Route exact path="/cardset/:title/:id" component={Cards}/>
            <Route exact path="/account/login/" component={Login}/>
          </Switch>
        </Router>
      </Provider>
      </div>
    );
  }
}

/*const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.isAuth,
      username: state.auth.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(loadUser());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);*/

export default App;
