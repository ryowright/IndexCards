import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardSet from './Cardset';
import CreateCardset from './Create';
import { retrievecardsets } from '../../actions/CRUD';
import './Create.css';


class CardSets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            create: false,
        };
    }

    componentDidMount() {
        this.props.retrievecardsets();
    }

    toggleCreateForm = () => {
        let create = this.state.create;
        create = !create;
        this.setState({
            create: create
        })
    }

    render () {
        let items = this.props.cardsets;
        
        if (this.state.create) {
            return (
                <div>
                    <h1>Your Cardsets</h1>
                    {items.map((item) => {
                        return <CardSet id={item.id} title={item.title} desc={item.description} />
                    })}
                    <CreateCardset />
                    <button className="create-btn" onClick={this.toggleCreateForm}>New Cardset</button>
                </div> 
            )
        }
        else {
            return (
                <div>
                    <h1>Your Cardsets</h1>
                    {items.map((item) => {
                        return <CardSet id={item.id} title={item.title} desc={item.description} />
                    })}
                    <button className="create-btn" onClick={this.toggleCreateForm}>New Cardset</button>
                </div> 
            )
        }
    };
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cardsets: state.CRUD.cardsets,
    }
}

export default connect(mapStateToProps, { retrievecardsets })(CardSets);