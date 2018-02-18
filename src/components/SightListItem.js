import React, {Component} from 'react'

class SightListItem extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let data = this.props.data;

        return (
        <div className='container-sight' onClick={this.props.callback}> 
            <div className='sight-species'>
                <span className='sight-title'>Spotted <br/></span>
                <span>{data.species}</span>
            </div>

            <div className='sight-details'>
                <div className='sight-date'>
                    <span className='sight-title'>Timestamp <br/></span>
                    <span>{data.dateTime}</span>
                </div>
            </div> 
        </div>   
        )
    }
}

export default SightListItem;