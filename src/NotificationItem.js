import React from 'react';

export default class NotiticationItem extends React.Component {
    componentDidMount() {
        if (this.props.timer) {
            setTimeout(() => {
                this.removeSelf();
            }, this.props.timer);
        }
    }

    removeSelf() {
        let node = ReactDOM.findDOMNode(this.refs[this.props.name]);
        if (node) {
            ReactDOM.unmountComponentAtNode(node.parentNode);
        }
    }

    componentWillUnmount() {
        this.props.close();
        let node = ReactDOM.findDOMNode(this.refs[this.props.name]);
        if (node && node.parentNode) {
            node.parentNode.remove();
        }
    }

    render() {
        let {type, title, message, name} = this.props;
        return (
            <div ref={name}>
                <div className='notifications-title'>
                    {title}
                </div>
                <div className='notifications-message'>
                    {message}
                </div>
                <div className='notifications-close' onClick={this.removeSelf.bind(this)}>
                    ×
                </div>
            </div>
        );
    }
};
