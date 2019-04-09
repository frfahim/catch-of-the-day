import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';

        // return null when not loaded
        if (!fish) return null;

        if (!isAvailable) {
            return (
                <CSSTransition
                classNames="order"
                key={key}
                timeout={{ enter: 500, exit: 500 }}
            >
                <li key={key}>
                    Sorry {fish ? fish.name: 'Fish'} is no longer available!
                </li>
            </CSSTransition>
            )
        }
        return (
            <CSSTransition
                classNames="order"
                key={key}
                timeout={{ enter: 500, exit: 500 }}
            >
                <li key={key}>
                    <span>
                        <TransitionGroup
                            component="span"
                            className="count"
                        >
                            <CSSTransition
                                classNames="count"
                                key={count}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <span>
                                    {count}
                                </span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                        { formatPrice(count * fish.price) }
                        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        )
    }

    render () {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price)
            }
            else return prevTotal
        }, 0)
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    { orderIds.map(this.renderOrder) }
                </TransitionGroup>
                <div className="total">
                    Total: 
                    <strong>
                        {formatPrice(total)}
                    </strong>
                </div>
            </div>
        )
    }
}

export default Order;