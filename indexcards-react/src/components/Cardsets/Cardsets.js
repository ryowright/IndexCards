import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CardSet from './Cardset';
import CreateCardset from './Create';
import { retrievecardsets } from '../../actions/CRUD';
import './Cardsets.css';


class CardSets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            create: false,
        };
    }

    componentDidMount() {
        console.log('mount')
        
        //if(this.props.cardsets.length === 0) {
        this.props.retrievecardsets();
        //console.log(this.props.cardsets);
        //}
        //console.log(cardsets)
        //this.setState({
        //    items: cardsets
        //})
      /*  const headers = {
            "Authorization": `Token ${this.props.auth.token}`
        }
        axios.get("http://127.0.0.1:8000/api/cardsets/", {headers, })    // might want to consider performing this as a redux action
            .then((response) => {                       // to fetch from users list -- could be more efficient
                console.log(`mount: ${this.props.auth.username}`);
                response.data.map(res => {
                    console.log(res.owner);
                    if(res.owner === this.props.auth.username){
                        this.setState({
                            isLoaded: true,
                            items: [...this.state.items, res]
                        });
                    }
                })
                
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )*/
    }

    /*toggleCreateForm = () => {
        let create = this.state.create;
        create = !create;
        if (create) {
            return <CreateCardset />
        }
    }*/

    render () {
        let items = this.props.cardsets;
        console.log(items);
        return (
            <div>
                <h1>Your Cardsets</h1>
                {items.map((item) => {
                    return <CardSet id={item.id} title={item.title}/>
                })}
            </div>
            
        )
    };
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cardsets: state.CRUD.cardsets,
    }
}

export default connect(mapStateToProps, { retrievecardsets })(CardSets);