import React from 'react';
import ReactDOM from 'react-dom';
import './Dialog.css';

interface DialogProps {
    title: string | JSX.Element;
    children: JSX.Element | null;
    onCloseClick: () => void;
}

export default class Dialog extends React.Component<DialogProps> {
    render() {
        return ReactDOM.createPortal(
            <div className="modal">
                <div className="header">
                    <span className="title">{this.props.title}</span>
                    <button type="button" className="close-button" onClick={this.props.onCloseClick}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="body">{this.props.children}</div>
            </div>,
            document.body,
        );
    }
}
