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
            items: [],
            cards: [],
            cardsLoaded: false,
        };
    }

    componentDidMount() {
        axios.get("/api/cardsets/" + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    isLoaded: true,
                    items: response.data,
                    cards: response.data.cards,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
        console.log('componentDidMount')
    }

    // NEEDS FIX: cards state does not work as intended
    componentDidUpdate() {
        let cardData = [];
        if (this.state.cardsLoaded == false) {
            //console.log('update');
            this.state.cards.map((card) => 
                axios.get(card).then((response) => cardData.push(response.data))
            );
            this.setState({
                cards: cardData,
                cardsLoaded: true
            });
        }
    }

    render () {
        let pageTitle = null;
        const items = this.state.items;
        let cards = this.state.cards;

        if (this.state.cardsLoaded) {
            console.log('loading cards');
            console.log(cards);
            console.log('cards loaded');
            console.log('card titles');
            cards.map((card) => console.log(card.title))
        }

        if(items.id == this.props.match.params.id) {
            pageTitle = items.title;
        }

        return (
            <div>
                <h1>{pageTitle} Cardset</h1>
                <p>test</p>
            </div>
        );
    };
}

export default Cards;