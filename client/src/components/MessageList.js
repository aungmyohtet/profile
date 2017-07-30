import { h, Component } from 'preact';
import { Router } from 'preact-router';

export default class MessageList extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        let messageList = this.props.messages.map((message) => <li>{message.content}</li>);
        return (
            <ul>
                {messageList}
            </ul>
        );
    }
}