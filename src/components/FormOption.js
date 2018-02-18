import React, {Component} from 'react'

class FormOption extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            warn: false,
            selected: false,
            selectedSpecies: null,
        }

        this.setSelectedSpecies = this.setSelectedSpecies.bind(this);
        this.check = this.check.bind(this);
    }

    mention(status) {
        this.setState({warn: status})
    }

    showWarning() {
        if (!this.state.warn)
            return;
        
        return (
        <div> 
            <span>Warning test</span>
        </div>)
    }

    setSelectedSpecies(e) {
        console.log(e.currentTarget);

        let index = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget);
        
        this.props.callback('species', this.props.options[index].name);
        
        this.setState({
            selected: true,
            selectedSpecies: this.props.options[index]
        })
    }

    check(data) {
        let valid = false;
        let values = this.props.data;

        this.props.callback(values.id, data.target.value);
    }

    create(data) {
        if (data.type === 'dropdown')
        {
            let title = this.state.selected ? this.state.selectedSpecies.name : data.tooltip;
            let required = data.required;

            return (
                <div className='dropdown'>
                    <label htmlFor={'dropdownMenuButton'} className='form-label-title'>{data.text}</label>
                    <a id='dropdownMenuButton' type='button' className='btn btn-secondary dropdown-toggle' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{title}</a>
                    <div className='dropdown-menu' id={'form-input-' + data.id} aria-labelledby="dropdownMenuButton">
                    {
                        this.props.options.map(element => {
                            return <a onClick={this.setSelectedSpecies} className='dropdown-item' href='#'>{element.name}</a>
                        })
                    }
                    </div>
                </div>
            )
        }
        
        if (data.type === 'input' || data.type === 'number')
        {
            return (
            <div> 
                <label htmlFor={'form-input-' + data.id} className='form-label-title'>{data.text}</label>
                <input id={'form-input-' + data.id} type={data.type} onChange={this.check} className='form-control'/>
            </div>)
        }



    }

    render() {
        return (
        <div className='item-form-sub form-group'>
            {
                this.create(this.props.data)
            }

            {
                this.showWarning()
            }
        </div>  
        ) 
    }
}

export default FormOption;