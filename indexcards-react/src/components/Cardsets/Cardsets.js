import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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
        axios.get("http://127.0.0.1:8000/api/cardsets")
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
                {console.log(this.props.auth.isAuth)}
                {console.log(`username: ${this.props.auth.username}`)}
                <h1>Your Cardsets</h1>
                {items.map(item => (
                    <CardSet key={item.id} id={item.id} title={item.title} />
                ))}
            </div>
            
        )
    };
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(CardSets);