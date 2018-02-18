import React, {Component} from 'react'
import Network from '../modules/Network'
import SightListItem from './SightListItem'

class SightList extends React.Component {
    constructor(props) {
        super(props)

        console.log('sightlist', props);

        this.state = {
            sort: 'desc',
            sights: props.sights,
            timestamp: 0,
        }

        this.setAscending = this.setAscending.bind(this);
        this.setDescending = this.setDescending.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({sights: props.sights});
    }

    create() {
        let data = null;

        if (!this.state.sights)
            return;
        
        let items = this.state.sights.map((elem) => {
            return <SightListItem callback={this.props.callback} data={elem} />
        })

        return items;
    }

    setAscending() {
        let data = this.state.sights;
        
        data.sort((a, b) => {
            return (new Date(b.dateTime)).getTime() - (new Date(a.dateTime)).getTime()
        })

        this.setState({
            sort: 'asc',
            sights: data
        })
    }

    setDescending() {
        let data = this.state.sights;

        data.sort((a, b) => {
            return (new Date(a.dateTime)).getTime() - (new Date(b.dateTime)).getTime()
        })

        this.setState({
            sort: 'desc',
            sights: data
        })
    }

    render() {
        console.log('rendering List')

        console.log(this.state.sights);

        return (
        <div className='container-sight-list'> 
            <div id='sightlist-options' className='btn-group' role='group'>
                <button onClick={this.setAscending} className='btn btn-secondary'>Ascending</button>
                <button onClick={this.setDescending} className='btn btn-secondary'>Descending</button>

            </div>
            <div className='sightlist-elements'>
            {
                this.create()
            }
            </div>
        </div>  
        ) 
    }
}

export default SightList;