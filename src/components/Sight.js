import React, {Component} from 'react'

class Sight extends React.Component {
    constructor(props) {
        super(props)

    }

    /*

    */
    

    render() {
        return (
        <div className='container-sight-info'> 
            <div className='sight-description'>
                <span className='sight-title'> Description <br/></span>
                <span> {this.props.data.description} </span>
            </div>

            <div className='sight-information'> 
                <div id='container-sight-buttons'> 
                    <button onClick={this.props.showform} className='btn btn-secondary'>Add new sighting</button>
                </div>
                <div className='sight-date sight-info'>
                    <span className='sight-title'> Date of spotting: </span>
                    <span> {this.props.data.dateTime} </span>
                </div>

                <div className='sight-count sight-info'>
                    <span className='sight-title'> Amount of birds: </span>
                    <span> {this.props.data.count} </span>
                </div>

                <div className='sight-info'>
                    <span className='sight-title'> ID:</span>
                    <span> {this.props.data.id} </span>
                </div>
            </div>
        </div>  
        ) 
    }
}

export default Sight;