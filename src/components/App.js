import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import samples from '../sample-fishes';
import base from '../base';
import Fish from './Fish';

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };


    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    };

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        )
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    addFish = (fish) => {
        const fishes = { ...this.state.fishes };
        fishes[`fish${Date.now()}`] = fish;
        this.setState({fishes: fishes})
    };

    updateFish = (key, updatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = updatedFish;
        this.setState({ fishes })
    };

    loadSampleFishes = sample => {
        this.setState({ fishes: samples})
    };

    addToOrder = (key) => {
        const order  = { ...this.state.order }
        order[key] = order[key] + 1 || 1;
        this.setState({order}) // this.setState({order: order})
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fish market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes}/>
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    fishes={this.state.fishes}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        );
    }
}

export default App;
