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
                create: true,
                edit: false
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
                edit: true,
                create: false
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
                        <h1>{pageTitle}</h1>
                        <h2>{counter} / {count}</h2>

                        <div className="cardDisplayContainer">
                            <button className="prev-btn" onClick={this.getPrevCard}>Previous</button>
                            <Card display={display} clicked={this.toggleCard} />
                            <button className="next-btn" onClick={this.getNextCard}>Next</button>
                        </div>      
                    </div>
                    <div className="options">
                        <button className="card-create-btn" onClick={this.toggleCreate}>Create</button>
                        <button className="card-delete-btn" onClick={() => this.props.deletecard(id)}>Delete</button>
                        <button className="card-edit-btn" onClick={this.toggleEdit}>Edit</button>
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


/* 
{this.state.edit ? <button className="card-create-btn" onClick={this.toggleCreate} disabled>Create</button> : <button className="card-create-btn" onClick={this.toggleCreate}>Create</button>}
                        <button className="card-delete-btn" onClick={() => this.props.deletecard(id)}>Delete</button>
                        {this.state.create ? <button className="card-edit-btn" disabled>Edit</button> : <button className="card-edit-btn" onClick={this.toggleEdit}>Edit</button>}
*/