import React, {Component} from 'react'
import Network from '../modules/Network'
import SightList from '../components/SightList'
import Sight from '../components/Sight'
import Form from '../components/Form'

class Home extends Component {
    constructor(props) {
        super(props)

        this.setSights = this.setSights.bind(this);

        this.state = {
            sights: null,
            species: null,
            selected: 0,
            timestamp: 0,
            showForm: false,
        }

        this.setSpecies = this.setSpecies.bind(this);
        this.setSights = this.setSights.bind(this);
        this.setCurrent = this.setCurrent.bind(this);
        this.setShowForm = this.setShowForm.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    setCurrent(e) {
        let index = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget);

        this.setState({
            selected: index
        })
    }

    setShowForm() {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    show() {
        if (!this.state.sights)
            return;

        if (!this.state.showForm)
            return <Sight showform={this.setShowForm} data={this.state.sights[this.state.selected]}/>
        else
            return( <Form callback={this.updateList} showform={this.setShowForm} species={this.state.species}/>)
    }

    updateList() {
        Network.request('http://localhost:8081/sightings', 'GET', {}, this.setSights, () => {});
    }

    setSpecies(data) {
        let time = new Date().getTime();
        
        this.setState({
            species: data,
            timestamp: time
        })
    }

    setSights(data) {
        let time = new Date().getTime();

        this.setState({
            sights: data,
            timestamp: time
        })
    }

    render() {
        let data = null;
        let time = new Date().getTime();

        console.log('Rendering Home');

        if (time - this.state.timestamp > 5000 || (!this.state.sights && !this.state.species))
        {
            Network.request('http://localhost:8081/sightings', 'GET', data, this.setSights, () => {});
            Network.request('http://localhost:8081/species', 'GET', data, this.setSpecies, () => {});            
        }

        return (
        <div className='container-data container-fluid'>
            {
                this.state.sights ? <SightList callback={this.setCurrent} sights={this.state.sights} /> : undefined
            }
            {this.show()}
        </div>   
        )
    }
}

export default Home