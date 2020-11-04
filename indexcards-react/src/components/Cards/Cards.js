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
            cardDisplayValue: true,
            cards: {
                values: [],
                descs: [],
                ids: [],
            },
            Count: null,
            index: 0,
        };
    }

    toggleCard = () => {
        let display = this.state.cardDisplayValue;
        this.setState({cardDisplayValue: !display})
    }

    // FIX THIS
    increaseIndex = () => {
        //if (this.state.index < this.state.Count){
        let currindex = this.state.index;
        this.setState({
            index: currindex + 1
        });
        //}
    }

    componentDidMount() {
        let tempValues = [];
        let tempDescs = [];
        let tempIds = [];
        
        axios.get("/api/cardsets/" + this.props.match.params.id)
            .then((response) => {
                response.data.cards.map((card) => {
                    axios.get(card)
                    .then((result) => {
                        tempValues.push(result.data.value);
                        tempDescs.push(result.data.description);
                        tempIds.push(result.data.id);
                    })
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        //---------------------------------------------------------------------
        this.setState({cards: {
            values: tempValues,
            descs: tempDescs,
            ids: tempIds
        }, cardsLoaded: true});
        console.log('componentDidMount');
    }

    /*componentDidUpdate() {
        if (this.state.cardsLoaded == false) {
            this.state.items.cards.map((card) => 
                axios.get(card).then((response) => this.setState({cardsData: [response.data, ...this.state.cardsData],
                cards: {
                    values: [response.data.value, ...this.state.cards.values],
                    descs: [response.data.description, ...this.state.cards.descs],
                    ids: [response.data.id, ...this.state.cards.ids],
                }}))
                .then(this.setState({
                    cardsLoaded: true
                }))
            );
        }
    }*/

    //componentDidUpdate(){
    //    console.log(this.state)
    //}
    render () {
        let pageTitle = this.props.match.params.title;


        // FIX THIS
        if (this.state.cardsLoaded & this.state.Count == null){
            let values = this.state.cards.ids;
            let count = values.length;
            this.setState({Count: count});
        }

        // FIX THIS
        console.log(this.state.cards.ids);
        return (
            <div>
                <h1>{pageTitle} Cardset</h1>
                <p>{this.state.cards.ids[this.state.index]}</p>
                <button onClick={this.increaseIndex}>Next Card</button>
                
            </div>
        );
    };
}

export default Cards;