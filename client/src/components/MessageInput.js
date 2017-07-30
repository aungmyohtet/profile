import { h, Component } from 'preact';
import { Router } from 'preact-router';

export default class MessageInput extends Component {

    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.render = this.render.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        if (this.props.input.type === "text") {
            return (
                <div>
                    <input type="text" onChange={this.handleChange} onKeyPress={this.handleKeyPress}></input>
                </div>
            );
        } else if (this.props.input.type === "select") {
            var buttons = this.props.input.data.map((d) => <button onClick={this.handleClick}>{d}</button>);
            return (
                <div>
                    {buttons}
                </div>
            );
        } else {
            return (<div>
            </div>);
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            var message = { type: 'text', question: 'name', content: e.target.value }
            this.props.send(message);
            e.target.value = '';
        }
    }

    handleClick(e) {
        var message = { type: 'select', question: 'programming language', content: "NodeJS"};
        this.props.send(message);
    }
}