import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CardSet from './Cardset';
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
        fetch("http://127.0.0.1:8000/api/cardsets")
            .then(console.log('success'))
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    items: result
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
            items.map(item => (
                <CardSet title={item.title} clicked={this.props.clicked}/>
            ))
        )};
    }

export default CardSets;