import React, {Component} from 'react';
import Card from './Card';
import CreateCard from './Create';
import UpdateCard from './Update';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { retrievecards, nextcard, prevcard, deletecard } from '../../actions/CRUD';
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
            create: false,
            edit: false,
        };
    }

    toggleCard = () => {
        let display = this.state.displayCardValue;
        this.setState({displayCardValue: !display})
    }

    getNextCard = () => {
        this.setState({displayCardValue: false})
        this.props.nextcard();
    }

    getPrevCard = () => {
        this.setState({displayCardValue: false})
        this.props.prevcard();
    }

    componentDidMount () {
        console.log('retrieve cards')
        this.props.retrievecards(this.props.match.params.id);
        this.setState({
            cardsLoaded: true,
        })
    }

    toggleCreate = () => {
        if (this.state.create == false) {
            this.setState({
                create: true
            });
        } else {
            this.setState({
                create: false
            });
        }
    }

    toggleEdit = () => {
        if (this.state.edit == false) {
            this.setState({
                edit: true
            });
        } else {
            this.setState({
                edit: false
            });
        }
    }
   
    render () {
        if(!this.props.auth.isAuth) {
            <Redirect to="/"/>
        }
        
        let pageTitle = this.props.match.params.title; // cardset title
        let value, desc, id, counter, count = null;
        let display;

        if(this.props.cards[this.props.index]){

            value = this.props.cards[this.props.index]['value'];
            desc = this.props.cards[this.props.index]['description'];
            id = this.props.cards[this.props.index]['id'];  // current card id
            counter = this.props.counter;
            count = this.props.count;

        }
        if (this.state.displayCardValue){
            display = value;
        } else {
            display = desc;
        }

        
        if (this.state.cardsLoaded) {
            return (
                <div className="cards-container">
                    <div className="displayContainer">
                        <h1>{pageTitle} Cardset</h1>
                        <h3>{counter} / {count}</h3>

                        <div className="cardDisplayContainer">
                            <button id="prev" onClick={this.getPrevCard}>Previous card</button>
                            <Card display={display} clicked={this.toggleCard} />
                            <button id="next" onClick={this.getNextCard}>Next card</button>
                        </div>      
                    </div>
                    <div className="options">
                        {this.state.edit ? <button onClick={this.toggleCreate} disabled>Create</button> : <button onClick={this.toggleCreate}>Create</button>}
                        <button onClick={() => this.props.deletecard(id)}>Delete</button>
                        {this.state.create ? <button disabled>Edit</button> : <button onClick={this.toggleEdit}>Edit</button>}
                    </div>
                    <div className="createform-container">
                        {this.state.create ? <CreateCard cardSetId={this.props.match.params.id}/> : ""}
                        {this.state.edit ? <UpdateCard cardSetId={this.props.match.params.id} cardId={id} value={value} description={desc}/> : ""}
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

export default connect(mapStateToProps, { retrievecards, nextcard, prevcard, deletecard })(Cards);