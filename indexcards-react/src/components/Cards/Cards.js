import React, {Component} from 'react';
import axios from 'axios';
import Card from './Card';
import './Cards.css';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cardsLoaded: false,
            items: [],
            currentCard: {
                value: null,
                desc: null,
                id: null,
            },
            counter: 1,
            cardCount: 0,
            index: 0,
            displayCardValue: false,
        };
    }

    toggleCard = () => {
        let display = this.state.displayCardValue;
        this.setState({displayCardValue: !display})
    }

    getCard = () => {
        let index = this.state.index;
        if(this.state.items.cards !== undefined){
        axios.get(this.state.items.cards[index])
        .then((response) => this.setState({
            currentCard: {
                value: response.data.value,
                desc: response.data.description,
                id: response.data.id
            },
        }))
        }
    }

    // Need max limit on index -- need count of cards to get max -- DONE
    getNextCard = () => {
        let index = this.state.index;
        let counter = this.state.counter;
        let max = this.state.cardCount;
        index += 1;
        counter += 1;

        if (this.state.currentCard.value !== null & index < max)
        {
            axios.get(this.state.items.cards[index])
            .then((response) => this.setState({
            currentCard: {
                value: response.data.value,
                desc: response.data.description,
                id: response.data.id
            },
            counter: counter,
            index: index,
            displayCardValue: false,
        }))
        }
    };

    // Need min limit on index -- DONE
    getPrevCard = () => {
        let index = this.state.index;
        let counter = this.state.counter;
        index -= 1;
        counter -= 1;

        if (this.state.currentCard.value != null & index >= 0)
        {
            axios.get(this.state.items.cards[index])
            .then((response) => this.setState({
            currentCard: {
                value: response.data.value,
                desc: response.data.description,
                id: response.data.id
            },
            counter: counter,
            index: index,
            displayCardValue: false,
        }))
        }
    };

    componentDidMount() {
        
        axios.get("http://127.0.0.1:8000/api/cardsets/" + this.props.match.params.id)
            .then((response) => {
                this.setState({items: response.data, cardCount: response.data.cards.length})
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        //---------------------------------------------------------------------
        this.setState({cardsLoaded: true});
    }

   
    render () {
        let pageTitle = this.props.match.params.title; // cardset title
        let value, desc, id = null;
        let counter = this.state.counter; // current card number
        let max = this.state.cardCount; // total number of cards
        let display;

        if (this.state.currentCard.value == null) {
            this.getCard();
        }
        else {
            value = this.state.currentCard.value;
            desc = this.state.currentCard.desc;
            id = this.state.currentCard.id;
        }

        if (this.state.currentCard.value != null){
            if (this.state.displayCardValue){
                display = value;
            }
            else {
                display = desc;
            }
        }
        
        
        return (
            <div className="displayContainer">
                <h1>{pageTitle} Cardset</h1>
                <h3>{counter} / {max}</h3>

                <div className="cardDisplayContainer">
                    <button id="prev" onClick={this.getPrevCard}>Previous card</button>
                    <Card display={display} id={id} clicked={this.toggleCard}/>
                    <button id="next" onClick={this.getNextCard}>Next card</button>
                </div>      
            </div>
        );
    };
}

export default Cards;