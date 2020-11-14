import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatecard, retrievecards } from '../../actions/CRUD';

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
        //this.props.retrievecards(this.props.cardSetId);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render () {
        const {value, description} = this.state;
        
        return (
            // Create card form
            <div className="createcard-container">
                <form method="post" onSubmit={this.handleSubmit}>

                    <input name="value"
                        value={value}
                        onChange={this.handleChange}
                        className="create-card-value"
                        placeholder="value" 
                    required/>

                    <input name="description"
                        onChange={this.handleChange}
                        value={description}
                        className="create-card-description"
                        placeholder="description"
                    required/>

                    <button type="submit">Edit Card</button>
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