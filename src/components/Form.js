import React, {Component} from 'react'
import FormOption from './FormOption'
import Network from '../modules/Network'
/*
    Form structure

    We can make this into a versatile one
    with custom amounts of inputs

    options = [{
        id
        text
        input type
        special (enum??)
    }]
    necessary = [] //values that are necessary (will error if not)


    How to handle value checks?
  
    state 
*/

const formOptions = [{
    id: 'description',
    text: 'Description (necessary)',
    necessary: true,
    type: 'input'
}, {
    id: 'count',
    text: 'Amount of birds (necessary)',
    necessary: true,
    type: 'number'
}, {
    id: 'species',
    text: 'Possible species (necessary)',
    necessary: true,
    type: 'dropdown',
    tooltip: 'Select a species'
}, {
    id: 'id',
    text: 'Custom ID',
    necessary: false,
    type: 'number'
}]

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            species: null,
            timestamp: 0,
            description: null,
            count: null,
            error: false,
        }

        this.setValue = this.setValue.bind(this);
        this.send = this.send.bind(this);
        this.showError = this.showError.bind(this);
    }

    showError() {
        if (!this.state.error)
            return;

        return (
            <div>
                <span>One of the necessary values were not filled or are invalid</span>
            </div>
        )
    }

    create(data) {
        return <FormOption callback={this.setValue} data={data} options={this.props.species || {}} />
    }

    setValue(key, value) {
        console.log('Setting values', key, value)

        let obj = {};

        obj[key] = value;

        this.setState(obj);
    }

    send() {
        console.log('Submitting');

        let canSend = true;

        if (this.state.species === null)
            canSend = false;

        if (this.state.description === null)
            canSend = false;

        if (this.state.count === null)
            canSend = false;

        console.log(canSend);

        this.setState({error: !canSend});

        if (!canSend)
            return;

        let data = {
            dateTime: (new Date()).toISOString(),
            description: this.state.description,
            species: this.state.species,
            count: this.state.count
        }

        if (this.state.id !== -1)
            data.id = this.state.id;

        //send the data block to server
        Network.request('http://localhost:8081/sightings', 'POST', data, () => {this.props.callback()}, ()=>{alert("Failed to send new sighting, check console")});
    }



    render() {
        let data = null;
        let time = new Date().getTime();

        return (
        <div className='form-add-sight'>
            {
                this.showError()
            }
            <form> 
                {
                    formOptions.map(element => {
                        return this.create(element);    
                    })
                }
                <div className='form-button-container'>

                <button onClick={this.send} type="button" class="btn btn-primary">Submit</button>
                <button className='btn btn-secondary' id='form-button-return' onClick={this.props.showform}>Return</button>
                </div>
            </form>
        </div>  
        ) 
    }
}

export default Form;