import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {

    static propTypes = {
        match: PropTypes.object
    }
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const {params} = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);

        if(localStorageRef){
            this.setState({ order: JSON.parse(localStorageRef)});
        }
        console.log(localStorageRef);
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        const fishes = { ...this.state.fishes };
        fishes[`fish${Date.now()}`] = fish;
        this.setState({
            fishes: fishes
        });
    }

    updateFish = (key, updatedFish) => {
        //1. Copy current state of fishes
        const fishes = { ...this.state.fishes };

        //2. Update fish
        fishes[key] = updatedFish;

        //3. Set state with updated Fish
        this.setState({fishes: fishes});

    }

    deleteFish = (key) => {
        //1. Copy current state of fishes
        const fishes = { ...this.state.fishes };

        //2. Delete fish
        fishes[key] = null;

        //3. Set state with updated Fish
        this.setState({fishes: fishes});

    }

    loadSampleFishes = () => {
      this.setState({
          fishes: sampleFishes
      });

    }

    addToOrder = (key) => {
        //1. Take copy of the existing state
        const order = { ...this.state.order };
        //2. Either add, or update the state of order
        order[key] = order[key] + 1 || 1;
        //3. setState
        this.setState({order: order});
    }

    removeFromOrder = (key) => {
        //1. Take copy of order state
        const order = {...this.state.order };
        //2. Delete specific order
        delete order[key];
        //3 Set State
        this.setState({order: order});
    }

    render() {
        return (
          <div className="catch-of-the-day">
          <div className="menu">
          <Header tagline="Fresh Seafood Market"></Header>
          <ul className="fishes">
         {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
          </ul>
          </div>
          <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}></Order>
          <Inventory addFish = {this.addFish} storeId = {this.props.match.params.storeId} updateFish = {this.updateFish} deleteFish={this.deleteFish} loadSampleFishes = {this.loadSampleFishes} fishes={this.state.fishes}></Inventory>
          </div>
        )
    };

}

export default App;
