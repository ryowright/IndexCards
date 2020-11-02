import React, {Component} from 'react';
import './Cardset.css';

const style = {

}

class CardSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("/api/cardsets")
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
                <div key={item.cardset} className="Cardset">
                    {item.title}
                </div>
            ))
        )};
    

}

export default CardSet;