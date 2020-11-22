import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatecard, retrievecards } from '../../actions/CRUD';
import './Cards.css';

class UpdateCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            description: this.props.description,
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updatecard(this.props.cardId, this.state.value, this.state.description);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render () {
        const {value, description} = this.state;
        
        return (
            // Edit card form
            <div className="edit-card-container">
                <form method="post" onSubmit={this.handleSubmit}>

                    <input name="value"
                        value={value}
                        onChange={this.handleChange}
                        className="edit-card-value"
                        placeholder="Value"
                        maxLength="100"
                    required/>

                    <textarea name="description"
                        onChange={this.handleChange}
                        value={description}
                        className="edit-card-description"
                        placeholder="Description"
                        maxLength="300"
                    required/>

                    <button className="edit-card-submit-btn" type="submit">Edit Card</button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        cards: state.CRUD.cards,
    }
}

export default connect(mapStateToProps, { updatecard, retrievecards })(UpdateCard)