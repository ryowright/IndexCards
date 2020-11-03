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
   // let cardsets = <CardSets clicked={this.toggleShowCards}/>
   // let cards = <Cards />


    // TODO: Replace Conditionals with Routes and Routers
    //if (this.state.showCards){
    //  cardsets = null;
    //}
    //else {
    //  cards = null;
    //}

    return (
      <div className="App">
         <Router>
          <Route path="/" render={() => <h1>Home Page</h1>} exact/>
          <Route path="/cardset/:id" component={Cards}/>
          <Route path="/cardsets" component={CardSets}/>
        </Router>
      </div>
    );
  }
}

export default App;
