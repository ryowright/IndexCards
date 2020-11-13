import React, {Component} from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { retrievecards, nextcard, prevcard } from '../../actions/CRUD';
import './Cards.css';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsLoaded: false,
            values: [],
            descs: [],
            cards: [],
            currentCard: {
                value: null,
                desc: null,
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

    componentDidMount () {
        console.log('retrieve cards')
        this.props.retrievecards(this.props.match.params.id);
        this.setState({
            cardsLoaded: true,
        })
    }

   
    render () {
        if(!this.props.auth.isAuth) {
            <Redirect to="/"/>
        }

        let pageTitle = this.props.match.params.title; // cardset title
        let value, desc = null;
        let display;

        if(this.props.cards[this.props.index]){
            console.log(this.props.cards[this.props.index]['value']);
            value = this.props.cards[this.props.index]['value'];
            desc = this.props.cards[this.props.index]['description'];
        }
        if (this.state.displayCardValue){
            display = value;
        } else {
            display = desc;
        }
        
        if (this.state.cardsLoaded) {
            return (
                <div className="displayContainer">
                    <h1>{pageTitle} Cardset</h1>
                    <h3>{this.props.counter} / {this.props.count}</h3>

                    <div className="cardDisplayContainer">
                        <button id="prev" onClick={() => this.props.prevcard()}>Previous card</button>
                        <Card display={display} clicked={this.toggleCard}/>
                        <button id="next" onClick={() => this.props.nextcard()}>Next card</button>
                    </div>      
                </div>
            );
        }
        else {
            return (
                <h1>Loading...</h1>
            )
        }
    };
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cards: state.CRUD.cards,
        index: state.CRUD.index,
        counter: state.CRUD.counter,
        count: state.CRUD.count,
    }
}

export default connect(mapStateToProps, { retrievecards, nextcard, prevcard })(Cards);