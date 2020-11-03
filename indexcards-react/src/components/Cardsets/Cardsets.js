import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import CardSet from './Cardset';
import Cards from '../Cards/Cards'
import './Cardsets.css';


class CardSets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }

    componentDidMount() {
        axios.get("/api/cardsets")
            .then((response) => {
                this.setState({
                    isLoaded: true,
                    items: response.data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render () {
        const items = this.state.items;

        return (
            <div>
                <h1>Your Cardsets</h1>
                {items.map(item => (
                    <CardSet id={item.id} title={item.title} />
                ))}
            </div>
            
        )
    };
}

export default CardSets;