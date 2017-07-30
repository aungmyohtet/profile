import { h, Component } from 'preact';
import { Router } from 'preact-router';

export default class MessageInput extends Component {

    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.render = this.render.bind(this);
    }

    render() {
        if (this.props.type = "text") {
            return (
                <div>
                    <input type="text" onChange={this.handleChange} onKeyPress={this.handleKeyPress}></input>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            console.log("Enter key pressed");
            var message = { type: 'text', question: 'name', content: e.target.value }
            this.props.send(message);
            this.setState({ input: '' })
            e.target.value = '';
        }
    }
}