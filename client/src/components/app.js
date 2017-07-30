import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

import MessageInput from './MessageInput';
import MessageList from './MessageList'

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			input: {type: null}
		}
		this.send = this.send.bind(this);
	}

	componentDidMount() {
		var self = this;
		var socket = require('socket.io-client')();
		socket.on('message', function (data) {
			var messages = self.state.messages.splice(0);
			self.setState({
				messages: messages.concat(data.messages),
				input: data.input
			});
		});
		
		this.socket = socket;
	}

	render() {
		return (
			<div id="app">
				<MessageList messages={this.state.messages} />
				<MessageInput input={this.state.input} send={this.send} />
			</div>
		);
	}

	send(message) {
		this.socket.emit('message', message);
	}
}
