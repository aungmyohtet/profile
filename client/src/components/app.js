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
		socket.on('message', function (message) {
			var messages = self.state.messages.splice(0);
			messages.push(message);
			self.setState({
				messages: messages
			});
		});
		socket.on('input', function (data) {
			self.setState({
				input: data
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
