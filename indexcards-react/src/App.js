import React, { Component } from 'react';
import './App.css';
import CardSets from './components/Cardsets/Cardsets';
import Cards from './components/Cards/Cards';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    showCards: false,
    }
  }
  
  toggleShowCards = () => {
    const doesShowCards = this.state.showCards;
    this.setState({showCards: !doesShowCards});
  }

  render() {

    return (
      <div className="App">
         <Router>
          <Route path="/" render={() => <h1>Home Page</h1>} exact/>
          <Link to="/cardsets">Cardsets</Link>
          <Route path="/cardset/:title/:id" component={Cards}/>
          <Route path="/cardsets" component={CardSets}/>
        </Router>
      </div>
    );
  }
}

export default App;
