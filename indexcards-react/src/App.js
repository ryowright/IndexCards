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
    let cardsets = <CardSets clicked={this.toggleShowCards}/>
    let cards = <Cards />
    let display = '';


    // TODO: Replace Conditionals with Routes and Routers
    if (this.state.showCards){
      cardsets = null;
      display = 'Cards'
    }
    else {
      cards = null;
      display = 'Cardsets'
    }

    return (
      <div className="App">
        <h1>Your {display}</h1>
        {cardsets}
        {cards}
      </div>
    );
  }
}

export default App;
