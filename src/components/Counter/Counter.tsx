import * as React from 'react';
import './Counter.css';

export interface CounterProps {
    initialValue?: number;
}

interface IncrementDecrementState {
    value: number;
}

export default class Counter extends React.Component<CounterProps, IncrementDecrementState> {
    constructor(props: CounterProps) {
        super(props);
        this.state = {
            value: props.initialValue || 0,
        };
    }

    render() {
        return React.createElement(
            'div',
            { className: 'counter-container' },
            React.createElement(
                'button',
                { onClick: () => this.setState(prevState => ({ value: prevState.value - 1 })), className: 'btn' },
                '-',
            ),
            React.createElement('span', { className: 'value' }, this.state.value),
            React.createElement(
                'button',
                { onClick: () => this.setState(prevState => ({ value: prevState.value + 1 })), className: 'btn' },
                '+',
            ),
        );
    }
}
