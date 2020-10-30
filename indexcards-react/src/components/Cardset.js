import React, {Component} from 'react';

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
            <ul>
                {items.map(item => (
                    <li key={item.cardset}>
                        Item title: {item.title}
                    </li>
                ))}
            </ul>
        );
    }

}

export default CardSet;