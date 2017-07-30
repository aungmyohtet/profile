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
            var buttons = this.props.input.selection.map((d) => <button data-value={d} onClick={this.handleClick}>{d}</button>);
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
            var message = { question: this.props.input.question, answer: e.target.value }
            this.props.send(message);
            e.target.value = '';
        }
    }

    handleClick(e) {
        var message = { question: this.props.input.question, answer: e.target.getAttribute('data-value') };
        this.props.send(message);
    }
}